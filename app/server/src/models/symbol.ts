/**
 * RUN: npx ts-node src/models/symbols.ts 
 */
import * as PA from '@prisma/client'
import { createTickerCocard } from './card'

const prisma = new PA.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})


function parse(symbolName: string): { name: string, cat?: PA.SymbolCat, oauthoName?: string, error?: string } {
  // TODO:
  let cat: PA.SymbolCat | undefined
  let error: string | undefined
  let oauthoName: string | undefined

  if (symbolName.startsWith('$'))
    cat = PA.SymbolCat.TICKER
  else
    error = '尚未支援的symbol format'

  return { name: symbolName, cat, oauthoName, error }
}

export async function getOrCreateSymbol(symbolName: string): Promise<[PA.Symbol, { created: boolean }]> {
  /** 若建立新symbol時，會同步建立cocard */
  const res = await prisma.symbol.findOne({ where: { name: symbolName } })
  if (res)
    return [res, { created: false }]

  // 建立symbol
  let cat: PA.SymbolCat
  if (symbolName.startsWith('$'))
    cat = PA.SymbolCat.TICKER
  else
    throw new Error("還沒考慮到的symbol format")
  // TODO: symbol name需要先檢查format才存入
  const symbol = await prisma.symbol.create({ data: { cat, name: symbolName } })

  // 建立cocard
  if (PA.SymbolCat.TICKER)
    await createTickerCocard(symbol)
  else
    throw new Error("還沒考慮到的symbol format")

  return [symbol, { created: true }]
}

export function symbolToUrl(symbolName: string): string {
  const parsed = parse(symbolName)
  if (parsed.error)
    throw new Error(parsed.error)
  return `//${parsed.name}`
}
