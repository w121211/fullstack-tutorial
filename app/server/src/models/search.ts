/**
 * Fuzzy search for page title, ticker, etc
 */
import _ from 'lodash'
import dayjs from 'dayjs'
import Fuse from 'fuse.js'
import * as PA from '@prisma/client'


// 將資料庫取出的資料存在記憶體中（定時更新），用於fuzzy search
// TODO: 改存在Redis
let topicTitles: string[] | null = null
let topicFuse: Fuse<string>
let topicFuseUpdatedAt: Date | null = null
let tickerTitles: string[] | null = null

const prisma = new PA.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

async function getAllTopicTitles(): Promise<string[]> {
  const titles: string[] = []
  let cursor: number | null = null
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let results
    if (cursor !== null) {
      results = await prisma.page.findMany({
        take: 10,
        where: { template: { equals: "TOPIC" } },
        orderBy: { id: 'asc' },
        cursor: { id: cursor },
      })
    } else {
      results = await prisma.page.findMany({
        take: 10,
        where: { template: { equals: "TOPIC" } },
        orderBy: { id: 'asc' }
      })
    }
    if (results.length === 0)
      break
    titles.concat(results.map(e => e.title))
    cursor = results[-1].id
  }
  return titles
}

async function getAllTickers() {
  const titles: string[] = []
  let cursor: number | null = null
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let results
    if (cursor !== null) {
      results = await prisma.page.findMany({
        take: 10,
        where: { template: { equals: "TICKER" } },
        orderBy: { id: 'asc' },
        cursor: { id: cursor },
      })
    } else {
      results = await prisma.page.findMany({
        take: 10,
        where: { template: { equals: "TICKER" } },
        orderBy: { id: 'asc' }
      })
    }
    if (results.length === 0)
      break
    titles.concat(results.map(e => e.title))
    cursor = results[-1].id
  }
  return titles
}

export async function searchTopic(term: string) {
  if (topicTitles === null) {
    topicTitles = await getAllTopicTitles()
    topicFuse = new Fuse(topicTitles, {
      includeScore: true
    })
  }
  return topicFuse.search(term)
}

export async function searchPage(url: string) {
  /** 用url搜尋page，看是否已建立？ */
  throw new Error("")
}

export function searchAll(term: string) {
  throw new Error("")
}