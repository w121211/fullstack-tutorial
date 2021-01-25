/**
 * 1. 僅用於初始資料庫建立 2. 作為server-side的測試demo
 * 
 * Run:
 * cd ...../server/src && npx ts-node seed.ts 
 */
import { hash } from 'bcryptjs'
import dotenv from 'dotenv'
import * as PA from '@prisma/client'
import * as CardOps from './models/card'
import { symbolToUrl } from './models/symbol'
import { getOrCreateLink } from './models/link'
import { MARKER_FORMAT, CommentMeta } from './models/marker'
// Dummy-data for test

if (!process.env.BOT_EMAIL || !process.env.BOT_PASSWORD)
    throw new Error()

const BOT = { email: process.env.BOT_EMAIL, password: process.env.BOT_PASSWORD }
const TESTUSER = { email: "aaa@aaa.com", password: "aaa" }
const TICKERS = [
    { title: "Boeing", symbol: "$BA", wiki: "Boeing", topics: "[[Airplane]], [[Aerospace]]", links: "[Wiki](https://en.wikipedia.org/wiki/Boeing)" },
    { title: "Google", symbol: "$GOOG", wiki: "Google", topics: "[[Internet]]", },
    { title: "Apple", symbol: "$AAPL", wiki: "Apple", topics: "[[Internet]]", }
]
const TOPICS = [
    { title: "Airplane", symbol: "[[Airplane]]", wiki: "Airplane", tickers: ["$BA"] },
    { title: "Internet", symbol: "[[Internet]]", wiki: "Internet", tickers: ["$GOOG", "$AAPL"] },
]

const OAUTHOR = { name: "@aaa:youtube", link: { url: "http://url.of.webpage0", domain: "somedomain.com" }, links: ["[Youtube](http://link.to.channel)"], srcTitle: "Some author title" }

const WEBPAGE = { link: { url: "http://url.of.webpage1", domain: "somedomain.com" }, srcTitle: "Some webpage title 1", srcAuthor: "@aaa:youtube", }

// Main

const prisma = new PA.PrismaClient({
    errorFormat: "pretty",
    log: ['query', 'info', 'warn'],
})

async function testTickerOps() {
    // console.log("-- 新增 Selfcards & 把comments copy至cocard")
    // const cocard = await prisma.cocard.findOne({ where: { linkUrl: symbolToUrl('$BA') } })
    // if (cocard === null)
    //     throw new Error()
    // const selfcard = await prisma.selfcard.create({
    //     data: {
    //         user: { connect: { id: user1.id } },
    //         template: PA.CardTemplate.TICKER,
    //         comments: {
    //             create: [
    //                 { meta: { mark: "pros" }, text: "pros 111", user: { connect: { id: user1.id } }, cocard: { connect: { id: cocard.id } }, count: { create: {} } },
    //                 { meta: { mark: "pros" }, text: "pros 222", user: { connect: { id: user1.id } }, cocard: { connect: { id: cocard.id } }, count: { create: {} } },
    //                 { meta: { mark: "cons" }, text: "cons 111", user: { connect: { id: user1.id } }, cocard: { connect: { id: cocard.id } }, count: { create: {} } },
    //                 { meta: { mark: "targetprice" }, text: "123.4", user: { connect: { id: user1.id } }, cocard: { connect: { id: cocard.id } }, count: { create: {} } },
    //                 { meta: { mark: "act" }, text: "[X]buy []sell []watch", user: { connect: { id: user1.id } }, cocard: { connect: { id: cocard.id } }, count: { create: {} } },
    //             ]
    //         },
    //         symbol: { connect: { name: "$BA" } }
    //     }
    // })

    // console.log("-- 同步更新cocard:act的投票統計&存入meta(按期間分別統計會更好)")
    // await prisma.cocard.update({
    //     where: { id: cocard.id },
    //     data: { meta: { ...(cocard.meta as object), actCount: [1, 2, 3, 4] } }
    // })
}

async function testWebpageOps() {
    console.log("----- 新增Webpage cocard -----")

    console.log("1. 分析source url -> oauthor, contentType, contentTitle, ...")
    console.log("2. 新增oauthor, link, cocard & 同步用card comments存link meta")
    const [link, { fetched }] = await getOrCreateLink('https://www.youtube.com/watch?v=XVX4DNuV62s', BOT.email)

    // console.log("-- 基於source webpage，新增oauthor對於某個ticker的看法, ie 建立Ocard & 同時port到ticker cocard")
    // // TODO: 要怎樣紀錄oauthor的投票？ -> 1. 用comment紀錄 2. (NEXT)紀錄在vote上 -> 當前沒有看到為什麼一定要紀錄的原因
    // await prisma.ocard.create({
    //     data: {
    //         oauthor: { connect: { id: oauthor1.id } },
    //         template: PA.CardTemplate.TICKER,
    //         comments: {
    //             create: [
    //                 // 來源，讓user能找到這條的來源
    //                 // { meta: { key: "linkIds", linkIds: [webpages[0].id] }, user: { connect: { email: BOT.email } } },
    //                 // 共筆
    //                 { meta: { mark: "pros", sourceUrl: 'some/link/url' }, text: "pros 222", user: { connect: { id: user1.id } }, cocard: { connect: { id: cocard.id } }, count: { create: {} } },
    //                 { meta: { mark: "cons" }, text: "cons 111", user: { connect: { id: user1.id } }, cocard: { connect: { id: cocard.id } }, count: { create: {} } },
    //                 { meta: { mark: "targetprice" }, text: "123.4", user: { connect: { id: user1.id } }, cocard: { connect: { id: cocard.id } }, count: { create: {} } },
    //                 { meta: { mark: "act" }, text: "3", user: { connect: { id: user1.id } }, cocard: { connect: { id: cocard.id } }, count: { create: {} } },
    //             ]
    //         },
    //         symbol: { connect: { name: "$BA" } },
    //     }
    // })
    // console.log("-- 同步更新cocard:act的投票統計&存入meta(按期間分別統計會更好)")
    // await prisma.cocard.update({
    //     where: { id: cocard.id },
    //     data: { meta: { ...(cocard.meta as object), actCount: [1, 2, 3, 4] } }
    // })
    // console.log("-- 同步更新source cocard, ie 新增一個comment來連結oard")
    // // TODO: 還缺考慮已經有這個comment的情況（不用再建立一個）
    // prisma.comment.create({
    //     data: { meta: { key: "ocard" }, text: "@someon:$BA", user: { connect: { id: user1.id } }, cocard: { connect: { id: sourceCocard.id } } },
    // })

}

async function main() {
    console.log("-- 將Databse清空")
    await prisma.$executeRaw('TRUNCATE "User", "Oauthor", "Symbol", "Link", "Cocard", "Ocard", "Selfcard" CASCADE;')

    console.log("-- Insert users")
    const bot = await prisma.user.create({
        data: { email: BOT.email, password: await hash(BOT.password, 10) },
    })
    const user1 = await prisma.user.create({
        data: { email: TESTUSER.email, password: await hash(TESTUSER.password, 10) }
    })

    console.log("-- Insert symbols")
    const tickers = await prisma.$transaction(
        TICKERS.map(e => prisma.symbol.create(
            { data: { name: e.symbol, cat: PA.SymbolCat.TICKER } }
        )))
    const topics = await prisma.$transaction(
        TOPICS.map(e => prisma.symbol.create(
            { data: { name: e.symbol, cat: PA.SymbolCat.TOPIC } }
        )))

    console.log("-- 新增 Tickder Cocards")
    for (const e of tickers) await CardOps.createTickerCocard(e)

    // for (const e of TICKERS) {
    //     await CardOps.createTickerCocard(e.symbol, BOT.email, '', e.topics, e.links)
    // }
    // for (const e of TOPICS) {
    //     await CardOps.createTopicCocard(e.symbol, BOT.email, '', e.topics, e.links)
    // }

    await testWebpageOps()
    // await testTickerOps()

    console.log("(NEXT)-- Updating Cards: 所有的update都是創新comment --")

    // for (const e of TOPICS) {
    //     const pg = await PageOps.insertPage(bot.email, PageOps.initTopicPage(e.title, e.wiki, { tickers: e.tickers }))
    //     // const filled = PageOps.fillPage(pg)
    // }
    // for (const e of AUTHORS) {
    //     await prisma.symbol.create({ data: { name: e.symbol, cat: PA.SymbolCat.AUTHOR } })
    //     const pg = await PageOps.insertPage(bot.email, PageOps.initAuthorPage(e.symbol, e.srcTitle, { links: e.links }))
    // }
    // for (const e of WEBPAGES) {
    //     const pg = await PageOps.insertPage(bot.email, PageOps.initWebpagePage(e.link.url, e.srcTitle, e.srcAuthor))
    //     await prisma.link.create({
    //         data: {
    //             url: e.link.url,
    //             domain: e.link.domain,
    //             page: { connect: { id: pg.id } }
    //         }
    //     })
    // }

    // console.log(JSON.stringify(bk, null, 2))

    // console.log("-- 補充數據，例如propComments的values")
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
