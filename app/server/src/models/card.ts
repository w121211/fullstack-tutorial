/** 
 * TODO：目前的template非常不直覺、也不好擴展，需從頭設計
 */
import _ from 'lodash'
import dayjs from 'dayjs'
import * as PA from '@prisma/client'
import { symbolToUrl } from './symbol'
// import { Page } from '@prisma/client'

// --- Enums, types

interface CommentProps {
  symbol: string
  name: string
  wiki: string
  yfinance: string
  homesite: string
  redirect: string
}

enum CommentMark {
  // Only in cocard
  Props = 'props',
  Topics = 'topics',
  Tickers = 'tickers',
  Links = 'links',
  Tags = 'tags',
  Alternatives = 'alternatives',
  Act = 'act',
  ShowView = 'shortview',
  LongView = 'longview',
  Intro = 'intro',
  VoteCreate = 'votecreate',

  // Ticker selfcard, ocard
  Pros = 'pros',
  Cons = 'cons',
  TargetPrice = 'targetprice',

  // Common
  Ask = 'ask',
  Info = 'info',
  Fight = 'fight',
}

type CommentMeta = {
  mark?: CommentMark
  order?: number
  // 與其他comments做連結（alternatives & fights)
  commentIds?: number[]
  // 這comment是從哪個commment更新
  updatedFromId?: number

  // 目前顯示options都直接寫在前端，不記錄在comment-meta
  showAs?: string
  showReplyDirection?: string
  disableReply?: boolean
  // 確認input符合需要的格式（數字、...）
  validator?: string
}

type PollTemplate = {
  choices: string[]
}

export type CardMeta = {
  tickers?: string[]
  topics?: string[]
  links?: string[]
  // webpage content
  contentTitle?: string
  contentPublishedAt?: string
  // selfSymbol?: string | null
  // pros?: CommentTemplate
  // cons?: CommentTemplate
  // act?: CommentTemplate
  // wiki?: string | null
  // intro?: CommentTemplate
  // shortView?: CommentTemplate
  // longView?: CommentTemplate
  // srcAuthor?: string | null
  // srcTitle?: string | null
  // voteCreate?: CommentTemplate
}

type CommentTemplate = {
  meta: CommentMeta
  text: string
  poll?: PollTemplate
}

const prisma = new PA.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

const symbolToCardTemplate = {
  [PA.SymbolCat.TICKER]: PA.CardTemplate.TICKER,
  [PA.SymbolCat.TOPIC]: PA.CardTemplate.TOPIC,
}

async function createSymbolCocard(symbolName: string, botEmail: string, temps: CommentTemplate[]): Promise<PA.Cocard> {
  const symbol = await prisma.symbol.findOne({ where: { name: symbolName } })
  if (symbol === null)
    throw new Error('Symbol not found')
  return await prisma.cocard.create({
    data: {
      template: symbolToCardTemplate[symbol.cat],
      meta: {},
      comments: {
        create: temps.map(e => ({
          ...e,
          poll: e.poll ? {
            create: {
              choices: e.poll.choices,
              user: { connect: { email: botEmail } },
            }
          } : undefined,
          user: { connect: { email: botEmail } },
          count: { create: {} },
        }))
      },
      link: { create: { url: symbolToUrl(symbol.name), domain: 'selfsymbol' } },
    }
  })
}

export async function createTickerCocard(symbol: string, botEmail: string, props: string = '', topics: string = '', links: string = ''): Promise<PA.Cocard> {
  const temps: CommentTemplate[] = [
    { meta: { mark: CommentMark.Props }, text: props },
    { meta: { mark: CommentMark.Topics }, text: topics },
    { meta: { mark: CommentMark.Links }, text: links },
    { meta: { mark: CommentMark.Act }, text: '', poll: { choices: ["buy", "sell", "hold", "watch"] } },
    // 用來紀錄alternatives（實際的alternative將不會連到此，因為目前維持one card-many comments的架構）
    // - text用於更新連結，eg $AB, $AC...
    // - commentIds用於連結poll（其實也可以用filter取代...）, eg $AA vs $AB, $AA vs $AC...
    { meta: { mark: CommentMark.Alternatives, commentIds: [] }, text: '' },
    // DiscussEntry?
    // EditorEntry?
  ]
  return await prisma.cocard.create({
    data: {
      template: PA.CardTemplate.TICKER,
      meta: {},
      comments: {
        create: temps.map(e => ({
          ...e,
          poll: e.poll ? {
            create: {
              choices: e.poll.choices,
              user: { connect: { email: botEmail } },
            }
          } : undefined,
          user: { connect: { email: botEmail } },
          count: { create: {} },
        }))
      },
      link: { create: { url: symbolToUrl(symbol), domain: 'selfsymbol' } },
    }
  })
}

export async function createTopicCocard(symbol: string, botEmail: string, props: string = '', tickers: string = '', links: string = ''): Promise<PA.Cocard> {
  const temps: CommentTemplate[] = [
    // { meta: { mark: CommentMark.Intro }, text: '' },
    // { meta: { mark: CommentMark.Props }, text: props },
    { meta: { mark: CommentMark.Tickers }, text: tickers },
    { meta: { mark: CommentMark.Links }, text: links },
    { meta: { mark: CommentMark.Act }, text: '', poll: { choices: ["buy", "sell", "hold", "watch"] } },
    { meta: { mark: CommentMark.Alternatives, commentIds: [] }, text: '' },
  ]
  return await prisma.cocard.create({
    data: {
      template: PA.CardTemplate.TOPIC,
      meta: {},
      comments: {
        create: temps.map(e => ({
          ...e,
          poll: e.poll ? {
            create: {
              choices: e.poll.choices,
              user: { connect: { email: botEmail } },
            }
          } : undefined,
          user: { connect: { email: botEmail } },
          count: { create: {} },
        }))
      },
      link: { create: { url: symbolToUrl(symbol), domain: 'selfsymbol' } },
    }
  })
}

