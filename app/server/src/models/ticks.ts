/**
 * RUN: npx ts-node src/models/ticks.ts 
 */
// import * as https from 'https'
import _ from 'lodash'
import dotenv from 'dotenv'
import dayjs from 'dayjs'
import * as request from 'request'
import * as PA from '@prisma/client'

dotenv.config()

const TOKEN = process.env.IEX_TOKEN
const API_ROOT = "https://sandbox.iexapis.com/stable"

function api_urls(root: string, symbol: string) {
  return {
    previous: `${root}/stock/${symbol}/previous`,
    d5: `${root}/stock/${symbol}/chart/5d`,
    m1: `${root}/stock/${symbol}/chart/m1`,
    max: `${root}/stock/${symbol}/chart/max`,
  }
}

enum FetchSapn {
  PREVIOUS,
  D5,
  MAX,
}


const prisma = new PA.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

function fetchAndSaveTicks(symbol: PA.Symbol, span: FetchSapn = FetchSapn.D5) {
  console.log("連上IEX API抓取ticks")
  const api = api_urls(API_ROOT, symbol.name)
  const qs = {
    token: "Tsk_fb96b83c73fe46debd5e3b2ee5033c75"
    // screen_name: perm_data.screen_name,
    // user_id: perm_data.user_id
  }
  request.get({ url: api.d5, qs: qs, json: true }, async function (err, resp, body) {
    if (err) {
      console.error('error:', err)
      return
    }
    // console.log(body)
    const promises = body.map(function (e: any) {
      return prisma.tick.create({
        data: {
          open: e.open,
          close: e.close,
          high: e.high,
          low: e.low,
          volume: e.volume,
          change: e.change,
          changePercent: e.changePercent,
          at: new Date(e.date),
          symbol: { connect: { id: symbol.id } },
        }
      })
    })
    await Promise.all(promises)
  })
}


async function getTicks(symbolName: string) {
  // 找ticker
  const symbol = await prisma.symbol.findOne({
    where: { name: symbolName }
  })
  if (symbol === null) {
    console.error(`Symbol not found: ${symbolName}`)
    return
  }
  if (symbol.cat !== PA.SymbolCat.TICKER) {
    console.error(`Symbol${symbolName} is not a ticker`)
    return
  }

  // 查看目前的ticks更新到何時
  const tick = await prisma.tick.findFirst({
    where: { symbol: { id: symbol.id } },
    orderBy: { at: "desc" },
  })

  // 僅抓最新的部分
  if (tick === null) {
    await fetchAndSaveTicks(symbol, FetchSapn.MAX)
  } else {
    const now = dayjs()
    const diff = now.diff(dayjs(tick.at), 'day')
    // if (diff > 5) await fetchAndSaveTicks(symbol, FetchSapn.M1)
    console.log(tick)
  }

  // console.log(tk)

  // return tk
}

async function main() {

  return
  // const symbols = ["$BA", "$AA"]
  // const range = [2000, now()]  // start, end
  const symbolName = "TWTR"
  // try {
  //   await prisma.symbol.create({
  //     data: {
  //       cat: PA.SymbolCat.TICKER,
  //       name: symbolName,
  //     }
  //   })
  // } catch (e) {
  //   console.log(e)
  // }

  console.log("依照給予的ticker抓最新的ticks")

  const ticks = await getTicks("TWTR")
}

main()
  .catch(function (e) {
    throw e
  })
  .finally(async function () {
    await prisma.$disconnect()
  })
