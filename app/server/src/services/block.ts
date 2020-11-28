import _ from 'lodash'
import dayjs from 'dayjs'
import * as PA from '@prisma/client'

const prisma = new PA.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

enum Template {
  Ticker = "TICKER",
  View = "VIEW",
  Board = "BOARD",
  Trades = "TRADES",
  Alternatives = "ALTERNATIVES",
  Financial = "FINANCIAL",
  Price = "PRICE",
}

type CommentConnector = {
  create: any
  id?: number
}

export type PrismaBlockProperties = {
  name: string
  path: string
  fullName?: string
  selfSymbol?: string
  linkedSymbols?: string[]
  canComment?: boolean
  canOpenAlone?: boolean

  pollCreate?: CommentConnector
  pollTemplate?: CommentConnector

  commentIntro?: CommentConnector
  commentWiki?: CommentConnector
  commentSymbols?: CommentConnector
  commentTopics?: CommentConnector

  pollShortFeel?: CommentConnector
  pollLongFeel?: CommentConnector

  // pollCreate: { poll: { choices: ["Yes", "No"] } }
  // pollTemplate: { poll: { choices: ["主題", "事件"] } }
  // 需要逆向連結
  // commentTopics: { text: "Topics", replies: [], meta: { validater: "IS_TICKER" } },
  // commentTickers: { text: "Tickers", replies: [], meta: { validater: "IS_TICKER" } },
  // commentWiki: { text: "Wiki", replies: [], meta: { validater: "IS_WIKI_URL" } },
  // commentIntro: { text: "簡介", replies: [] },
  // pollShortFeel: {
  //   text: "短期", poll: { choices: ["看好", "看壞", "中立"] },
  // },
  // pollLongFeel: {
  //   text: "長期", poll: { choices: ["看好", "看壞", "中立"] },
  // },
}

type SchemaBlockProperties = PrismaBlockProperties & {
  commentIntro?: PA.Comment
  commentSymbols?: PA.Comment
}

type SchemaBlockBody = {
  blocks?: SchemaBlock[]
  text?: string[]
  ticks?: PA.Tick[]
  table?: number[]
  chart?: number[]
}

type SchemaBlock = PA.Block & {
  props: SchemaBlockProperties
  body: SchemaBlockBody
  spotComments?: Comment[]
}

function mapPropCommentsToProps(props: PA.JsonValue, propComments: PA.Comment[]): SchemaBlockProperties {
  const propCommentsDict: { [k: string]: any } = {}
  for (const e of propComments) propCommentsDict[e.id] = e

  const updatedProps: { [k: string]: any } = {}
  for (const [k, v] of Object.entries(props as PrismaBlockProperties)) {
    if (typeof (v) === "object" && "id" in v) {
      if (v["id"]) updatedProps[k] = propCommentsDict[v["id"]]
    } else {
      updatedProps[k] = v
    }
  }
  return updatedProps as SchemaBlockProperties
}

type PrismaBlockWithComments = PA.Block & {
  propComments?: PA.Comment[]
  comments?: PA.Comment[]
  children?: PA.Block[]
}

export async function fillBlock(block: PrismaBlockWithComments): Promise<any> {
  /**
   * 現階段的block不考慮有nested-nested block，也就是說，不用考慮child-block還需要在找children的情形
   */

  // Map PropComments
  const props = (block.propComments ?
    mapPropCommentsToProps(block.props, block.propComments) : block.props) as SchemaBlockProperties

  // Fill block body & symbol-linked-comments
  const body: { [k: string]: any } = {}
  switch (block.template) {
    case Template.Ticker: {
      const children = block?.children || []
      body.blocks = await Promise.all(children.map(e => fillBlock(e)))
      break
    }
    case Template.Price:
      body.ticks = await prisma.tick.findMany({
        where: { symbol: { name: props.selfSymbol } }
      })
      break
    case Template.View:
      // 使用spotComments，不做其他處理
      break
    case Template.Alternatives:
      // 使用spotComments，不做其他處理
      break
    case Template.Trades:
      // body.table = await prisma.trade.findMany()
      break
    case Template.Board:
      break
    case "HUB":
      break
    case "STAGE": {
      const bk = await prisma.block.findOne({ where: { path: "/stage" } })
      if (!bk)
        break
      const comments = await prisma.comment.findMany({
        where: {
          block: { path: "/stage" },
          isSpot: true,
          symbols: {
            every: {
              cat: PA.SymbolCat.TICKER,
              name: (props as SchemaBlockProperties).selfSymbol,
            }
          }
        },
        include: { symbols: true, count: true }
      })
      break
    }
  }

  console.log(props)
  // console.log(body)
  // console.log({ ...block, props, body })

  return { ...block, props, body }
}
