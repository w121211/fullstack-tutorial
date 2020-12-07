/**
 * 僅用於初始資料庫建立
 * 
 * Run:
 * cd .../src && npx ts-node seed.ts 
 */
import { hash } from 'bcryptjs'
import * as PA from '@prisma/client'
import * as PageOps from './models/page'
import { indexTitle } from './store/es'

// Dummy-data for test

const BOT = { email: "bot@bot.bot", password: "robo" }
const TESTUSER = { email: "aaa@aaa.com", password: "aaa" }
const TICKERS = [
    { title: "Boeing", symbol: "$BA", wiki: "Boeing", topics: ["[[Airplane]]"], },
    { title: "Google", symbol: "$GOOG", wiki: "Google", topics: ["[[Internet]]"], },
    { title: "Apple", symbol: "$AAPL", wiki: "Apple", topics: ["[[Internet]]"], }
]
const TOPICS = [
    { title: "Airplane", wiki: "Airplane", tickers: ["[[$BA]]"] },
    { title: "Internet", wiki: "Internet", tickers: ["[[$GOOG]]", "[[$AAPL]]"] },
]

// Main

const prisma = new PA.PrismaClient({
    errorFormat: "pretty",
    log: ['query', 'info', 'warn'],
})

async function main() {
    console.log("-- 將Databse清空")
    await prisma.$executeRaw('TRUNCATE "User", "Symbol", "Page" CASCADE;')

    console.log("-- Insert symbols")
    await Promise.all(
        TICKERS.map(e => prisma.symbol.create({
            data: { name: e.symbol, cat: PA.SymbolCat.TICKER }
        })))

    console.log("-- Insert users")
    const bot = await prisma.user.create({
        data: {
            email: BOT.email,
            password: await hash(BOT.password, 10),
        },
    })
    await prisma.user.create({
        data: {
            email: TESTUSER.email,
            password: await hash(TESTUSER.password, 10),
        }
    })

    console.log("-- 依template生成ticker & 存入資料庫")
    for (const e of TICKERS) {
        const pg = await PageOps.insertPage(bot.email, PageOps.initTickerPage(e.title, e.symbol, e.wiki, { topics: e.topics }))
        const filled = PageOps.fillPage(pg)
    }
    for (const e of TOPICS) {
        const pg = await PageOps.insertPage(bot.email, PageOps.initTopicPage(e.title, e.wiki, { tickers: e.tickers }))
        const filled = PageOps.fillPage(pg)
    }

    // console.log(JSON.stringify(bk, null, 2))

    console.log("-- Insert ticker page")

    console.log("-- 補充數據，例如propComments的values")
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

    // await prisma.comment.create({
    //     data: {
    //         text: "test",
    //         user: { connect: { id: bot.id } },
    //         page: { connect: { id: page.id } },
    //         poll: {
    //             create: {
    //                 choices: ["a", "b", "c", "d"],
    //                 user: { connect: { id: bot.id } },
    //                 count: {
    //                     create: {
    //                         nVotes: [1, 2, 3, 4],
    //                         nJudgments: [1, 2, 3, 4],
    //                     }
    //                 },
    //             }
    //         }
    //     }
    // })

    // console.log("-- Index titles (elasticsearch)")
    // const pages = await prisma.page.findMany({
    //     include: { symbol: true }
    // })
    // for (const e of pages) {
    //     if (e.template === PageOps.Template.Webpage)
    //         continue
    //     if (e.template === PageOps.Template.Topic)
    //         await indexTitle({ name: e.title, template: PageOps.Template.Topic })
    //     else if (e.template === PageOps.Template.Ticker) {
    //         await indexTitle({ name: e.title, template: PageOps.Template.Topic })
    //         if (e.symbol?.name) {
    //             await indexTitle({ name: e.symbol?.name, template: PageOps.Template.Ticker })
    //         }
    //     }
    // }

    console.log("-- All done!")
}


main()
    .catch(function (e) {
        console.error(e)
    })
    .finally(async function () {
        await prisma.$disconnect()
        process.exit(1)
    })
