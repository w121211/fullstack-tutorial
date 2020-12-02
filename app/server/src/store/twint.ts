/**
 * 抓elasticsearch的資料（twint project），用cronjob執行（與server-node分開）
 * 
 * Run:
 * cd .../src/webpages && npx ts-node youtube.ts
 */
import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch'
import * as PA from '@prisma/client'
import { PagePropsTemplate } from '../models/page'

const es = new Client({ node: 'http://es:9200' })
const prisma = new PA.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

const commonScanParams = {
  youtube: "*youtube*"
}

async function scanPages(params: string, afterAt?: Date) {
  /** 返回pages */
}

// --- Youtube (author, video)
async function saveYoutubePages(lastImportAt) {
  // channels -> author page


  // videos -> webpage
  for (const v of await scanPages()) {
    prisma.page.create()
  }
}

function scanYoutubePages() {
  const pages: string[] = []
  pages.map(function (e) {
    return "null"
  })

  // insert into database

  const params: RequestParams.Search = {
    index: 'game-of-thrones',
    body: {
      query: {
        match: {
          quote: 'winter'
        }
      }
    }
  }
}

function runEvery() {

}

async function run(): Promise<void> {
  // // Let's start by indexing some data
  // const doc1: RequestParams.Index = {
  //   index: 'game-of-thrones',
  //   body: {
  //     character: 'Ned Stark',
  //     quote: 'Winter is coming.'
  //   }
  // }
  // await client.index(doc1)

  // const doc2: RequestParams.Index = {
  //   index: 'game-of-thrones',
  //   body: {
  //     character: 'Daenerys Targaryen',
  //     quote: 'I am the blood of the dragon.'
  //   }
  // }
  // await client.index(doc2)

  // const doc3: RequestParams.Index = {
  //   index: 'game-of-thrones',
  //   // here we are forcing an index refresh,
  //   // otherwise we will not get any result
  //   // in the consequent search
  //   refresh: true,
  //   body: {
  //     character: 'Tyrion Lannister',
  //     quote: 'A mind needs books like a sword needs a whetstone.'
  //   }
  // }
  // await client.index(doc3)

  const result: ApiResponse = await client
    .search({
      index: 'scraper-page',
      body: {
        query: {
          bool: {
            must: [
              { wildcard: { from_url: "*youtube*" } },
              { range: { created_at: { gt: "2020-01-01T00:00:00" } } }
            ]
          }
        },
      }
    })
  console.log(result.body.hits.hits[0])
  for (const h of result.body.hits.hits[0]) {
    const j = JSON.parse(h["entry_meta"])
    const d = {
      author: j["author_detail"]["href"],
      publishedAt: j["entry_published_at"],
      title: j["title_detail"],
    }
  }

}

run()
  .catch(function (e: Error) {
    console.error(e)
    // process.exit(1)
  })