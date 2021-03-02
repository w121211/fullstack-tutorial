// import * as _ from 'lodash';
// import dayjs from 'dayjs';
import * as PA from '@prisma/client'
import { prisma } from '../context'
import { getBotEmail } from './user'
import { getOrCreateSymbol, symbolToUrl, SYMBOL_DOMAIN } from './symbol'
import { TextEditor } from '../editor'

interface ConnectedContent {
  // 這行對應的是投票
  poll?: true
  pollId?: number

  // 這行對應的是一個comment
  comment?: true
  commentId?: number
}

interface CardTemplate {
  body: string
  connContents: Record<string, ConnectedContent>
}

interface CardMeta {
  symbol?: string
  conn: Record<string, ConnectedContent>
}

const TEMPLATE: Record<PA.CardTemplate, CardTemplate> = {
  [PA.CardTemplate.TICKER]: {
    body: `[key]
[?] (這行留空)
[+]
[-]
[Alternative]
[Q]
`,
    connContents: { '[?]': { comment: true } },
  },
  [PA.CardTemplate.TOPIC]: {
    body: `[key]
[?] (這行留空)
[+]
[-]
[Q]`,
    connContents: { '[?]': { comment: true } },
  },
  [PA.CardTemplate.WEBPAGE]: {
    body: '',
    connContents: {},
  },
}

const SYMBOL_TO_TEMPLATE: Record<PA.SymbolCat, PA.CardTemplate> = {
  [PA.SymbolCat.TICKER]: PA.CardTemplate.TICKER,
  [PA.SymbolCat.TOPIC]: PA.CardTemplate.TOPIC,
}

async function createCard(
  template: PA.CardTemplate,
  symbol?: PA.Symbol,
  link?: PA.Link,
): Promise<
  PA.Cocard & {
    link: PA.Link
    body: PA.CardBody
  }
> {
  // 創comments, polls
  async function _createConnContents(
    contents: Record<string, ConnectedContent>,
  ): Promise<Record<string, ConnectedContent>> {
    const created: Record<string, ConnectedContent> = {}
    for (const k in contents) {
      const e = contents[k]
      // await prisma.poll.create({
      //   data: {
      //     // cat?: PollCat
      //     // status?: PollStatus
      //     choices?: PollCreatechoicesInput | Enumerable<string>
      //     user: UserCreateNestedOneWithoutPollsInput
      //     comment: CommentCreateNestedOneWithoutPollInput
      //     votes?: VoteCreateNestedManyWithoutPollInput
      //     count?: PollCountCreateNestedOneWithoutPollInput
      //   }
      // });
      if (e.comment) {
        // eslint-disable-next-line no-await-in-loop
        const comment = await prisma.comment.create({
          data: {
            // 直接用marker作為text
            text: k,
            user: { connect: { email: getBotEmail() } },
            count: { create: {} },
          },
        })
        created[k] = { ...e, commentId: comment.id }
      }
    }
    return created
  }

  if (symbol === undefined && link === undefined) {
    throw new Error('`symbol`或`link`需要有其中一個')
  }

  // 創body
  const editor = new TextEditor()
  editor.setBody(TEMPLATE[template].body)
  editor.flush()
  const body = await prisma.cardBody.create({
    data: {
      text: editor.toStoredText(),
      user: { connect: { email: getBotEmail() } },
      // cocard: { connect: { id: card.id } },
      // prev: { connect: { id: card.bodyId } },
    },
  })

  // 創meta
  const meta: CardMeta = {
    symbol: symbol ? symbol.name : undefined,
    conn: await _createConnContents(TEMPLATE[template].connContents),
  }

  // 創card, link
  return await prisma.cocard.create({
    data: {
      template,
      meta: meta as Record<string, any>,
      body: { connect: { id: body.id } },
      link: symbol
        ? { create: { url: symbolToUrl(symbol.name), domain: SYMBOL_DOMAIN } }
        : { connect: { id: (link as PA.Link).id } },
    },
    include: {
      link: true,
      body: true,
    },
  })
}

export async function createCardBody(card: PA.Cocard, editor: TextEditor, userId: string): Promise<PA.CardBody> {
  const creaters: PA.Prisma.Prisma__AnchorClient<PA.Anchor>[] = []
  for (const e of editor.getMarkerLines()) {
    if (e.new && e.stampId) {
      creaters.push(
        prisma.anchor.create({
          data: {
            // user: { connect: { email: userEmail } },
            user: { connect: { id: userId } },
            cocard: { connect: { id: card.id } },
            // cocard: isOcard(card) ? undefined : { connect: { id: card.id } },
            // ocard: isOcard(card) ? { connect: { id: card.id } } : undefined,
            count: { create: {} },
            path: e.stampId,
          },
        }),
      )
    }
  }
  const anchors = (await prisma.$transaction([...creaters])) as PA.Anchor[]
  editor.addAnchorIds(anchors.map(e => [e.id, e.path]))

  // 創一個新body，並與cocard連結(cocard部分會自動更新)
  return await prisma.cardBody.create({
    data: {
      text: editor.toStoredText(),
      user: { connect: { id: userId } },
      cocard: { connect: { id: card.id } },
      prev: { connect: { id: card.bodyId } },
    },
  })
}

export async function getOrCreateCardBySymbol(
  symbolName: string,
): Promise<
  PA.Cocard & {
    link: PA.Link
    body: PA.CardBody
  }
> {
  // 找cocard
  const res = await prisma.cocard.findUnique({
    // `symbolToUrl()`會throw error
    where: { linkUrl: symbolToUrl(symbolName) },
    include: { link: true, body: true },
  })
  if (res) {
    return res
    // const [text, linemetas] = splitMetatext(card.body.text);
    // return { ...card, body: { ...card.body, text, linemetas } };
  }

  // 沒找到cocard，創一個，同步創link
  const [symbol] = await getOrCreateSymbol(symbolName)
  return await createCard(SYMBOL_TO_TEMPLATE[symbol.cat], symbol)
}

export async function getOrCreateCardByLink(
  link: PA.Link,
): Promise<
  PA.Cocard & {
    link: PA.Link
    body: PA.CardBody
  }
> {
  // 找cocard
  const found = await prisma.cocard.findUnique({
    where: { linkUrl: link.url },
    include: { link: true, body: true },
  })
  if (found) {
    return found
    // const [text, linemetas] = splitMetatext(card.body.text);
    // return { ...card, body: { ...card.body, text, linemetas } };
  }

  // 沒找到cocard，創一個
  return await createCard(PA.CardTemplate.WEBPAGE, undefined, link)
}
