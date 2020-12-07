/** 
 * TODO：目前的template非常不直覺、也不好擴展，需從頭設計
 */
import _ from 'lodash'
import dayjs from 'dayjs'
import * as PA from '@prisma/client'
// import { Page } from '@prisma/client'

// --- Define enums, types

enum PageType {
  Link,
  Ticker,
  Topic,
  Author
}

export enum Template {
  Ticker = "TICKER",
  Topic = "TOPIC",
  Author = "AUTHOR",
  Webpage = "WEBPAGE",

  View = "VIEW",
  Board = "BOARD",
  Trades = "TRADES",
  Alternatives = "ALTERNATIVES",
  Financial = "FINANCIAL",
  Price = "PRICE",
  Tag = "TAG",
  Event = "EVENT",
  TickerTable = "TICKERTABLE"
}

type CommentProps = {
  validator: string
  showAs: string
  showReplyDir: string
  disableReply: boolean
}

type PollTemplate = {
  choices: string[]
}

type CommentTemplate = {
  // type: CommentType
  text: string
  poll?: PollTemplate
  props?: CommentProps
  replies?: string[]
  // 為了事後增加
  id?: number
}

export type PagePropsTemplate = {
  selfSymbol?: string | null
  tickers?: CommentTemplate
  topics?: CommentTemplate
  links?: CommentTemplate
  pros?: CommentTemplate
  cons?: CommentTemplate
  act?: CommentTemplate
  wiki?: string | null
  intro?: CommentTemplate
  shortView?: CommentTemplate
  longView?: CommentTemplate
  srcAuthor?: string | null
  srcTitle?: string | null
  voteCreate?: CommentTemplate
}

type PageTemplate = {
  title: string
  template: Template
  props: PagePropsTemplate
}

type GqlPageProps = PagePropsTemplate & {
  tickers?: PA.Comment
  topics?: PA.Comment
  links?: PA.Comment
  pros?: PA.Comment
  cons?: PA.Comment
  act?: PA.Comment
  intro?: PA.Comment
  shortView?: PA.Comment
  longView?: PA.Comment
  voteCreate?: PA.Comment
}

type PrismaPageWithComments = PA.Page & {
  propComments?: PA.Comment[]
  comments?: PA.Comment[]
}

// --- tempaltes

const defaultProps: PagePropsTemplate = {
  selfSymbol: null,
  tickers: { text: "tickers" },
  topics: { text: "topics" },
  links: { text: "links" },
  pros: { text: "pros" },
  cons: { text: "cons" },
  act: { text: "act", poll: { choices: ["buy", "hold", "sell"] } },
  wiki: null,
  intro: { text: "intro" },
  shortView: { text: "shortView", poll: { choices: ["up", "down"] } },
  longView: { text: "longView", poll: { choices: ["up", "down"] } },
  srcAuthor: null,
  srcTitle: null,
  voteCreate: { text: "voteCreate", poll: { choices: ["yes", "no"] } },
}

function _initProps(keys: string[], replies?: Record<string, string[]>) {
  let props: Record<string, any> = {}
  for (const k of keys) {
    if (k in defaultProps) {
      props[k] = defaultProps[k as keyof PagePropsTemplate]
      if (replies && k in replies)
        props[k]['replies'] = replies[k]
    } else {
      throw new Error(`No key found in props: ${k}`)
    }
  }
  return props
}

export function initTickerPage(title: string, symbol: string, wiki?: string, replies?: Record<string, string[]>): PageTemplate {
  const props = _initProps(['topics', 'links', 'pros', 'cons', 'act', 'intro'], replies) as PagePropsTemplate
  const temp = {
    title,
    template: Template.Ticker,
    props: {
      ...props,
      selfSymbol: symbol,
      wiki,
    }
  }
  // validateBlock(template)  // If not valid, throw error
  return temp
}

export function initTopicPage(title: string, wiki: string, replies?: Record<string, string[]>): PageTemplate {
  const props = _initProps(['voteCreate', 'tickers', 'topics', 'links', 'intro', 'shortView', 'longView'], replies) as PagePropsTemplate
  const temp = {
    title,
    template: Template.Topic,
    props: {
      ...props,
      wiki,
    },
  }
  // validateBlock(template)  // If not valid, throw error
  return temp
}

export function initAuthorPage(symbol: string, srcTitle?: string): PageTemplate {
  const { links } = defaultProps
  const temp = {
    title: `${symbol}`,
    template: Template.Author,
    props: {
      // author name
      selfSymbol: symbol,
      srcTitle: srcTitle ?? null,
      links,
    },
  }
  // validateBlock(template)  // If not valid, throw error
  return temp
}

export function initWebpagePage(url: string, srcAuthor: string, srcTitle: string): PageTemplate {
  const { tickers, topics, intro } = defaultProps
  const temp = {
    title: `${url}`,
    template: Template.Webpage,
    props: { srcAuthor, srcTitle, tickers, topics, intro, },
  }
  // validateBlock(template)  // If not valid, throw error
  return temp
}

// --- Insert items to database (用於初次建立時)

const prisma = new PA.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

export async function insertPage(botEmail: string, temp: PageTemplate): Promise<PA.Page> {
  // insert page （取得pageId)
  const page = await prisma.page.create({
    data: {
      title: temp.title,
      template: temp.template,
      props: {},
      symbol: temp.props.selfSymbol ? { connect: { name: temp.props.selfSymbol } } : undefined,
      // link: {connect: {link.id}}
    },
  })

  // insert propComments & replies (if any)
  const props = _.cloneDeep(temp.props)
  for (const k in props) {
    let v = props[k as keyof PagePropsTemplate]
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      const comment = await prisma.comment.create({
        data: {
          text: v.text,
          isProp: true,
          // user: { connect: { id: botUserId } },
          user: { connect: { email: botEmail } },
          page: { connect: { id: page.id } },
          propFor: { connect: { id: page.id } },
          count: { create: {} }
        }
      })
      v.id = comment.id

      if (v.poll) {
        await prisma.poll.create({
          data: {
            choices: v.poll.choices,
            user: { connect: { email: botEmail } },
            comment: { connect: { id: comment.id } },
            count: {
              create: {
                nVotes: v.poll.choices.map(e => 0),
                nJudgments: v.poll.choices.map(e => 0),
              }
            }
          }
        })
      }
      if (v.replies) {
        for (const e of v.replies) {
          await prisma.reply.create({
            data: {
              text: e,
              user: { connect: { email: botEmail } },
              comment: { connect: { id: comment.id } },
              count: { create: {} }
            }
          })
        }
      }
    }

  }
  // Update props json
  // console.log(props)
  return await prisma.page.update({
    data: { props },
    where: { id: page.id },
    include: { propComments: true },
  })
}

// --- Services

function mapProps(props: PA.JsonValue, propComments: PA.Comment[]): GqlPageProps {
  const idCommentDict: { [k: string]: PA.Comment } = {}
  for (const e of propComments)
    idCommentDict[e.id] = e

  const filled: { [k: string]: any } = {}
  for (const [k, v] of Object.entries(props as PagePropsTemplate)) {
    if (typeof (v) === "object" && v !== null && "id" in v) {
      if (v["id"])
        filled[k] = idCommentDict[v["id"]]
    } else {
      filled[k] = v
    }
  }
  return filled as GqlPageProps
}

export function fillPage(page: PrismaPageWithComments): any {
  if (page.propComments) {
    const props = mapProps(page.props, page.propComments)
    return { ...page, props }
  }
  return page
}