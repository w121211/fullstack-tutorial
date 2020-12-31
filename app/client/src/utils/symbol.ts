import * as QT from '../store/queryTypes'

export function encodeSymbol(symbol: string, cat: QT.SymbolCat) {
    if (cat === QT.SymbolCat.TICKER)
        return symbol
    if (cat === QT.SymbolCat.TAG)
        return `[[${symbol.replace(' ', '_')}]]`
}

export function decodeSymbol() {

}