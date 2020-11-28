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

enum Template {
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
  // 為了事後增加
  id?: number
}

type PagePropsTemplate = {
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

export function initTickerPage(title: string, symbol: string): PageTemplate {
  const { topics, links, pros, cons, act, intro } = defaultProps
  const temp = {
    title,
    template: Template.Ticker,
    props: {
      selfSymbol: symbol,
      topics, links, pros, cons, act, intro
    },
  }
  // validateBlock(template)  // If not valid, throw error
  return temp
}

export function initTopicPage(title: string, wikiEnTitle: string): PageTemplate {
  const { tickers, topics, links, intro, shortView, longView } = defaultProps
  const temp = {
    title: `${title}`,
    template: Template.Topic,
    props: {
      wiki: wikiEnTitle,
      tickers, topics, links, intro, shortView, longView,
    },
  }
  // validateBlock(template)  // If not valid, throw error
  return temp
}

export function initAuthorPage(symbol: string): PageTemplate {
  const { links } = defaultProps
  const temp = {
    title: `${symbol}`,
    template: Template.Author,
    props: { links },
  }
  // validateBlock(template)  // If not valid, throw error
  return temp
}

export function initWebpagePage(link: PA.Link, srcAuthor: string, srcTitle: string): PageTemplate {
  // TODO
  const temp = {
    title: `${link.url}`,
    template: Template.Webpage,
    props: {
      srcAuthor,
      srcTitle,
    },
  }
  // validateBlock(template)  // If not valid, throw error
  return temp
}

// --- Insert items to database (用於初次建立時)

const prisma = new PA.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

export async function insertPage(botUserId: string, temp: PageTemplate, link?: PA.Link) {
  // insert page （取得pageId)
  const page = await prisma.page.create({
    data: {
      title: temp.title,
      template: temp.template,
      props: {},
      // link: {connect: {link.id}}
    },
  })

  // insert propComments
  const props = _.cloneDeep(temp.props)
  for (const k in props) {
    let v = props[k as keyof PagePropsTemplate]
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      const propComment = await prisma.comment.create({
        data: {
          text: v.text,
          isProp: true,
          user: { connect: { id: botUserId } },
          page: { connect: { id: page.id } },
          propFor: { connect: { id: page.id } },
          count: { create: {} }
        }
      })
      if (v.poll) {
        await prisma.poll.create({
          data: {
            choices: v.poll.choices,
            user: { connect: { id: botUserId } },
            comment: { connect: { id: propComment.id } }
          }
        })
      }
      v.id = propComment.id
    }
    // Update block.props
    // console.log(props)
    await prisma.page.update({
      data: { props },
      where: { id: page.id }
    })
  }
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



