/**
 * RUN: npx ts-node src/models/symbols.ts 
 */
import * as PA from '@prisma/client'

const prisma = new PA.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

export async function getOrCreateSymbol(cat: PA.SymbolCat, name: string): Promise<[PA.Symbol, boolean]> {
  /** 若已經存在則返回 */
  const res = await prisma.symbol.findOne({ where: { name } })
  if (res === null)
    return [await prisma.symbol.create({ data: { cat, name } }), true]
  else
    return [res, false]
}

// async function main() {
//   // S&P500
//   const SYMBOLS_CSV = ""
//   const symbols = ["$BA", "$AA", "$CC", "$DD"]

//   // console.log('start cron')
//   console.log("將csv的symbols存入DB（若已存在則忽略）")
//   await Promise.all(symbols.map(e => createSymbolIfNotExist(e)))
// }

// main()
//   .catch(e => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
