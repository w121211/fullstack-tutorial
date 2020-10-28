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

export type PrismaBlockProperties = {
  name: string
  path: string
  fullName?: string
  symbol?: string
  linkedSymbols?: string[]
  canComment?: boolean
  canOpenAlone?: boolean
  commentIntro?: { create: any, id?: number }
  commentSymbols?: { create: any, id?: number }
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
  // Map PropComments
  const props = block.propComments ?
    mapPropCommentsToProps(block.props, block.propComments) : block.props

  // Fill block body & symbol-linked-comments
  const body: { [k: string]: any } = {}
  switch (block.template) {
    case Template.Ticker: {
      const children = block?.children || []
      body.blocks = await Promise.all(children.map(e => fillBlock(e)))
      break
    }
    case Template.Price:
      // body.ticks = await prisma.tick.findMany()
      break
    case Template.View:
      break
    case Template.Alternatives:
      // 直接用原本的spotComments
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
              name: (props as SchemaBlockProperties).symbol,
            }
          }
        },
        include: { symbols: true, count: true }
      })
      break
    }
  }

  console.log(props)
  console.log(body)
  console.log({ ...block, props, body })

  return { ...block, props, body }
}
