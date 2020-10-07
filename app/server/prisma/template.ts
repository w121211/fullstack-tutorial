/**
 * 思考：
 * - property該如何儲存？
 *   - 需求：透過更新template可更新property、template應該是一個類似json的東西、一些property允許user更新
 *   - 用欄位儲存的話會需要持續更新DB table(X)
 *   - JSON（靜態） + comments（動態）：修改時要重寫json
 * - 類template：用function，輸入需要的variables，生成對應的data
 *   - 真template: 直接以json形式儲存，而不是function
 * 
 * Run:
 * npx ts-node prisma/template.ts 
 */
import { readFileSync } from 'fs'
import * as _ from 'lodash'
import { hash } from 'bcryptjs'
import dayjs from 'dayjs'
import * as PC from '@prisma/client'
import { connect } from 'http2'
import { prismaVersion } from '@prisma/client'
import { exception } from 'console'

/**
 * $ticker
 * - _properties: tags (涵蓋categories), 
 * - price
 * - view: pros, cons, poll(sentiment with comments)
 * - compare [filter by tag, template]
 * - alternatives (擂台) []
 * - 財報 as table
 * - key trades (who is buying, holding %)
 * - board (or feed)
 * - (NEXT)
 * - google trends
 */

/**
 * #tag
 * - _properties: tags (涵蓋categories), 
 * - social meter (熱度)
 * - List of stocks
 * - board
 */

/**
* #tag
* - _properties: tags (涵蓋categories), 
* - social meter (熱度)
* - List of stocks
* - board
*/

const defaultProps = {
  name: "",
  path: "",
  symbol: ".",
  canComment: true,
  canOpenAlone: false,
  longName: { connect: true },
  linkedSymbols: { connect: true },
  intro: { connect: true },
}

// ---------------

enum Template {
  Ticker = "TICKER",
  View = "VIEW",
  Board = "BOARD",
  Trades = "TRADES",
  Alternative = "ALTERNATIVE",
  Financial = "FINANCIAL",
  Price = "PRICE",
}

enum CommentType {
  Text,
  Prop,
  Poll,
}

type Poll = {
  choices: string[]
}

type Comment = {
  type: CommentType
  text: string
  poll?: Poll
}

type BlockProperties = {
  name: string
  fullName?: string
  path?: string
  symbol?: string
  linkedSymbols?: string[]
  canComment?: boolean
  canOpenAlone?: boolean
  intro?: { create: Comment, id?: number }
}

type Block = {
  template: Template
  props: BlockProperties
  body?: {
    blocks?: Block[]
  }
  spotComments?: Comment[]
}

// ---------------

function initBoardBlock(ticker: string) {
  const name = "Board"
  return {
    template: Template.Board,
    props: { name, symbol: `${ticker}`, path: `/${ticker}/${name}` },
  }
}

function initAlternativeBlock(ticker: string) {
  const name = "Alternatives"
  return {
    template: Template.Alternative,
    props: { name, symbol: `${ticker}`, path: `/${ticker}/${name}` },
    spotComments: [
      { type: CommentType.Poll, text: "A vs B", poll: { choices: ["A", "B"] } },
      { type: CommentType.Poll, text: "A vs C" },
    ],
  }
}

function initTradesBlock(ticker: string) {
  const name = "Trades"
  return {
    template: Template.Trades,
    props: { name, symbol: `${ticker}`, path: `/${ticker}/${name}` },
  }
}

function initFinancialBlock(ticker: string) {
  const name = "Financial Report"
  return {
    template: Template.Financial,
    props: { name, symbol: `${ticker}`, path: `/${ticker}/${name}` },
  }
}

function initPriceBlock(ticker: string) {
  return {
    template: Template.Price,
    props: { name: "Price", symbol: `${ticker}`, path: `/${ticker}/Price` },
  }
}

function initViewBlock(ticker: string) {
  return {
    template: Template.View,
    props: { name: "View", symbol: `${ticker}`, path: `/${ticker}/View`, canComment: false, canOpenAlone: false },
    spotComments: [
      { type: CommentType.Prop, text: "Pros", suggestedReplies: [] },
      { type: CommentType.Prop, text: "Cons", suggestedReplies: [] },
      { type: CommentType.Poll, text: "Predict", suggestedReplies: [] },
    ],
  }
}

function initTickerBlock(ticker: string, block?: string) {
  const template = {
    template: Template.Ticker,
    props: {
      name: `${ticker}`,
      fullName: `${ticker}`,
      path: `/${ticker}`,
      symbol: `${ticker}`,
      canComment: false,
      intro: { create: { type: CommentType.Prop, text: "intro" } },
      symbols: { create: { type: CommentType.Prop, text: "symbols" } },
    },
    body: {
      blocks: [
        initViewBlock(ticker),
        initPriceBlock(ticker),
        // initFinancialBlock(ticker),
        // initTradesBlock(ticker),
        // initAlternativeBlock(ticker),
        // initBoardBlock(ticker),
      ]
    },
  }
  // if (block) return null
  return template
}

const prisma = new PC.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})



async function saveBlockToDB(botUserId: string, block: Block, parentBlockId?: number) {
  // 順序： create parentBlock > create comments > update props > children-block

  // 移除childrenBlocks後存入block，暫時不存block.props（因為還需要連結propComments）
  const children = block.body?.blocks || []
  const body = _.cloneDeep(block.body) || {}
  delete body?.blocks
  const bk = await prisma.block.create({
    data: {
      template: block.template,
      props: {},
      body,
      parent: parentBlockId ? { connect: { id: parentBlockId } } : undefined
    },
  })

  // 存入propComments，並update block.props
  const props = _.cloneDeep(block.props)
  for (const k in props) {
    let v = props[k as keyof BlockProperties]
    if (typeof v !== 'object' || Array.isArray(v)) continue
    if ('create' in v) {
      const propComment = await prisma.comment.create({
        data: {
          text: v.create.text,
          // isSpot: true
          user: { connect: { id: botUserId } },
          block: { connect: { id: bk.id } },
          propFor: { connect: { id: bk.id } },
        }
      })
      v["id"] = propComment.id
    }
  }
  console.log(props)
  await prisma.block.update({
    data: { props: block.props },
    where: { id: bk.id }
  })

  // 存comments
  const spotComments = block.spotComments?.map(
    async (e) => await prisma.comment.create({
      data: {
        text: e.text,
        // isSpot: true
        user: { connect: { id: botUserId } },
        block: { connect: { id: bk.id } }
      }
    }))

  // 存nested blocks
  for (let child of children) {
    saveBlockToDB(botUserId, child, bk.id)
  }
}

const BOT = { email: "bot@bot.com", password: "robo" }

async function main() {
  await prisma.$executeRaw('TRUNCATE "User", "Symbol" CASCADE;')

  const bot = await prisma.user.create({
    data: {
      email: BOT.email,
      password: await hash(BOT.password, 10),
    },
  })

  // const symbols = await Promise.all(
  //   SYMBOLS.map(e => prisma.symbol.create({ data: e })))

  console.log("依template生成ticker block")
  const bk = initTickerBlock("$BA")
  console.log(JSON.stringify(bk, null, 2))

  console.log("將ticker block存入DB")
  await saveBlockToDB(bot.id, bk)

  console.log("補充數據，例如propComments的values")
  // const user = "bot"
  // const data = {
  //   name: "$BA",
  //   props: { symbols: [] }
  // }
  // const bk = prisma.get("...")

  // for (let k in block.props) {
  //   const { id } = bk[block.props[k]]
  //   const comment = bk.propComments.filter(id)
  //   prisma.create({ reply: { text: "test", isSpot: true, user } })
  // }

}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
