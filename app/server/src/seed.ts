/**
 * 僅用於初始資料庫建立
 * Run:
 * cd .../src
 * npx ts-node seed.ts 
 */
import { hash } from 'bcryptjs'
import * as PA from '@prisma/client'
import * as PageOps from './services/page'

const BOT = { email: "bot@bot.bot", password: "robo" }
const TESTUSER = { email: "aaa@aaa.com", password: "aaa" }
const TICKERS = [
    { title: "Boeing", symbol: "$BA", wiki: "Boeing", topics: ["Airplane"], }
]
const TOPICS = [
    { title: "Airplane", wiki: "Airplane", tickers: ["$BA"] },
]

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

    console.log("-- 依template生成ticker")
    const pg = PageOps.initTickerPage("波音", "$BA")
    // console.log(JSON.stringify(bk, null, 2))

    console.log("-- Insert ticker page")
    await PageOps.insertPage(bot.id, pg)

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
}


main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
