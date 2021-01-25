import _ from 'lodash'
import dayjs from 'dayjs'
import * as PA from '@prisma/client'
import { symbolToUrl } from './symbol'

const prisma = new PA.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

const SYMBOL_LINK_DOMAIN = 'selfsymbol'

const symbolToCardTemplate = {
  [PA.SymbolCat.TICKER]: PA.CardTemplate.TICKER,
  [PA.SymbolCat.TOPIC]: PA.CardTemplate.TOPIC,
}

export async function createTickerCocard(symbol: PA.Symbol): Promise<PA.Cocard> {
  // const markers: [CommentMeta, string] = []
  // const temps: CommentTemplate[] = [
  //   // { meta: { mark: CommentMark.Props }, text: props },
  //   // { meta: { mark: CommentMark.Topics }, text: topics },
  //   // { meta: { mark: CommentMark.Links }, text: links },
  //   { meta: { mark: CommentMark.Act }, text: '', poll: { choices: ["buy", "sell", "hold", "watch"] } },
  //   // 用來紀錄alternatives（實際的alternative將不會連到此，因為目前維持one card-many comments的架構）
  //   // - text用於更新連結，eg $AB, $AC...
  //   // - commentIds用於連結poll（其實也可以用filter取代...）, eg $AA vs $AB, $AA vs $AC...
  //   { meta: { mark: CommentMark.Alternatives, commentIds: [] }, text: '' },
  //   // DiscussEntry?
  //   // EditorEntry?
  // ]
  return await prisma.cocard.create({
    data: {
      template: PA.CardTemplate.TICKER,
      meta: {},
      // comments: {
      //   create: temps.map(e => ({
      //     ...e,
      //     poll: e.poll ? {
      //       create: {
      //         choices: e.poll.choices,
      //         user: { connect: { email: botEmail } },
      //       }
      //     } : undefined,
      //     user: { connect: { email: botEmail } },
      //     count: { create: {} },
      //   }))
      // },
      link: { create: { url: symbolToUrl(symbol.name), domain: SYMBOL_LINK_DOMAIN } },
    }
  })
}

// export async function createTopicCocard(symbol: string, botEmail: string, props: string = '', tickers: string = '', links: string = ''): Promise<PA.Cocard> {
//   const temps: CommentTemplate[] = [
//     // { meta: { mark: CommentMark.Intro }, text: '' },
//     // { meta: { mark: CommentMark.Props }, text: props },
//     { meta: { mark: CommentMark.Tickers }, text: tickers },
//     { meta: { mark: CommentMark.Links }, text: links },
//     { meta: { mark: CommentMark.Act }, text: '', poll: { choices: ["buy", "sell", "hold", "watch"] } },
//     { meta: { mark: CommentMark.Alternatives, commentIds: [] }, text: '' },
//   ]
//   return await prisma.cocard.create({
//     data: {
//       template: PA.CardTemplate.TOPIC,
//       meta: {},
//       comments: {
//         create: temps.map(e => ({
//           ...e,
//           poll: e.poll ? {
//             create: {
//               choices: e.poll.choices,
//               user: { connect: { email: botEmail } },
//             }
//           } : undefined,
//           user: { connect: { email: botEmail } },
//           count: { create: {} },
//         }))
//       },
//       link: { create: { url: symbolToUrl(symbol), domain: SYMBOL_LINK_DOMAIN } },
//     }
//   })
// }
