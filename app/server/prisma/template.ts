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

// import { connect } from 'http2'
// import { prismaVersion } from '@prisma/client'
// import { exception } from 'console'

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
  symbol: "",
  canComment: true,
  canOpenAlone: false,
  longName: { connect: true },
  commentSymbols: { connect: true },
  commentIntro: { connect: true },
}

// --- Types ---

enum Template {
  Ticker = "TICKER",
  View = "VIEW",
  Board = "BOARD",
  Trades = "TRADES",
  Alternatives = "ALTERNATIVES",
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
  blockPath?: string,
  type: CommentType
  text: string
  poll?: Poll
  suggestedReplies?: string[],
}

type PropCommentCreater = {
  create: Comment,
  id?: number
}

type BlockProperties = {
  name: string
  path: string
  fullName?: string
  symbol?: string
  canComment?: boolean
  canOpenAlone?: boolean
  commentIntro?: PropCommentCreater
  commentSymbols?: PropCommentCreater
}

type BlockBody = {
  blocks?: Block[]
}

type Block = {
  template: Template
  props: BlockProperties
  body?: BlockBody
  spotComments?: Comment[]
}

// --- Initiators ---


function initBoardBlock(ticker: string): Block {
  const name = "Board"
  return {
    template: Template.Board,
    props: { name, symbol: `${ticker}`, path: `/${ticker}/${name}` },
  }
}

function initAlternativesBlock(ticker: string): Block {
  const name = "Alternatives"
  return {
    template: Template.Alternatives,
    props: { name, symbol: `${ticker}`, path: `/${ticker}/${name}` },
    spotComments: [
      { type: CommentType.Prop, text: "相似股票", },
      // { blockPath: "/stage", type: CommentType.Poll, text: "$A vs $B ", poll: { choices: ["A", "B"] } },
      // { blockPath: "/stage", type: CommentType.Poll, text: "A vs C" },
    ],
  }
}

function initTradesBlock(ticker: string): Block {
  const name = "Trades"
  return {
    template: Template.Trades,
    props: { name, symbol: `${ticker}`, path: `/${ticker}/${name}` },
  }
}

function initFinancialBlock(ticker: string): Block {
  const name = "Financial Report"
  return {
    template: Template.Financial,
    props: { name, symbol: `${ticker}`, path: `/${ticker}/${name}` },
  }
}

function initPriceBlock(ticker: string): Block {
  return {
    template: Template.Price,
    props: { name: "Price", symbol: `${ticker}`, path: `/${ticker}/Price` },
  }
}

function initCommonQBlock(ticker: string): Block {
  return {
    template: Template.View,
    props: { name: "Common", symbol: `${ticker}`, path: `/${ticker}/View`, canComment: false },
    spotComments: [
      { type: CommentType.Prop, text: "正面", suggestedReplies: [] },
      { type: CommentType.Prop, text: "負面", suggestedReplies: [] },
      { type: CommentType.Poll, text: "預測", suggestedReplies: [] },
    ],
  }
}

function initTickerBlock(ticker: string, block?: string) {
  const template: Block = {
    template: Template.Ticker,
    props: {
      name: `${ticker}`,
      fullName: `${ticker}`,
      path: `/${ticker}`,
      symbol: `${ticker}`,
      canComment: false,
      canOpenAlone: true,
      commentIntro: { create: { type: CommentType.Prop, text: "簡介" } },
      commentSymbols: { create: { type: CommentType.Prop, text: "標籤" } },
    },
    body: {
      blocks: [
        initCommonQBlock(ticker),
        initPriceBlock(ticker),
        // initFinancialBlock(ticker),
        // initTradesBlock(ticker),
        // initAlternativesBlock(ticker),
        // initBoardBlock(ticker),
      ]
    },
  }
  // if (block) return null
  validateBlock(template)  // If not valid, throw error
  return template
}

function validateBlock(block: Block) {
  function _isValidName(name: string) {
    const regex = /^[a-zA-Z0-9@$#_-]{2,20}$/
    if (!regex.test(name)) throw new Error("Not valid")
  }
  _isValidName(block.props.name)

  for (const bk of block.body?.blocks || [])
    validateBlock(bk)
}


// --- Main ---

const prisma = new PC.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

async function saveBlockToDB(botUserId: string, block: Block, parentBlockId?: number) {
  // 順序： create parentBlock > create comments > update props > children-block

  // 移除childrenBlocks後存入block，暫時不存block.props（因為還需要連結propComments）
  const { blocks: childrenBlocks, ...bodyWithoutBlocks } = block.body || {}
  const bk = await prisma.block.create({
    data: {
      path: block.props.path,
      template: block.template,
      props: {},
      body: bodyWithoutBlocks,
      parent: parentBlockId ? { connect: { id: parentBlockId } } : undefined
    },
  })

  // 存入propComments，並update block.props
  const props = _.cloneDeep(block.props)
  for (const k in props) {
    let v = props[k as keyof BlockProperties]
    if (typeof v !== 'object' || Array.isArray(v))
      continue
    if ('create' in v) {
      const propComment = await prisma.comment.create({
        data: {
          text: v.create.text,
          // isSpot: true
          user: { connect: { id: botUserId } },
          block: { connect: { id: bk.id } },
          propFor: { connect: { id: bk.id } },
          count: { create: {} }
        }
      })
      v["id"] = propComment.id
    }
  }
  console.log(props)
  await prisma.block.update({
    data: { props },
    where: { id: bk.id }
  })

  // 存comments
  const spotComments = block.spotComments?.map(
    async (e) => await prisma.comment.create({
      data: {
        text: e.text,
        // isSpot: true
        user: { connect: { id: botUserId } },
        block: { connect: { id: bk.id } },
        count: { create: {} }
      }
    }))

  // 存nested blocks
  for (let child of childrenBlocks || []) {
    saveBlockToDB(botUserId, child, bk.id)
  }
}

const BOT = { email: "bot@bot.bot", password: "robo" }

async function main() {
  console.log("需要的預資料")
  const preData = {
    ticker: "BA",
    name: "波音",
    tags: ["交通", ""],
    description: "some description",
    // priceTicks: JSON.parse(readFileSync('file', 'utf8')),
  }

  console.log("依template生成ticker block")
  const bk = initTickerBlock("$BA")
  console.log(JSON.stringify(bk, null, 2))

  // return

  // const symbols = await Promise.all(
  //   SYMBOLS.map(e => prisma.symbol.create({ data: e })))

  await prisma.$executeRaw('TRUNCATE "User", "Symbol", "Block" CASCADE;')

  const bot = await prisma.user.create({
    data: {
      email: BOT.email,
      password: await hash(BOT.password, 10),
    },
  })

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



// --- NEXT ---

class TemplateGenerator {
  regex: RegExp = /^[a-zA-Z0-9@$#_-]{2,20}$/
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  _isValidName(name: string) {
    return this.regex.test(name)
  }
}

// class TickerTemplate extends TemplateGenerator {
//   ticker: string

//   constructor(ticker: string) {
//     super("")
//     this.ticker = ticker
//   }

//   toJson() {
//     return {
//       template: Template.Ticker,
//       props: {
//         name: this.ticker,
//         fullName: `${ticker}`,
//         path: `/${ticker}`,
//         symbol: `${ticker}`,
//         canComment: false,
//         intro: { create: { type: CommentType.Prop, text: "intro" } },
//         symbols: { create: { type: CommentType.Prop, text: "symbols" } },
//       },
//       body: {
//         blocks: [
//           initViewBlock(ticker),
//           initPriceBlock(ticker),
//           // initFinancialBlock(ticker),
//           // initTradesBlock(ticker),
//           // initAlternativeBlock(ticker),
//           // initBoardBlock(ticker),
//         ]
//       },
//     }
//   }
// }

// request()