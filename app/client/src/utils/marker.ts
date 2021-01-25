import Prism, { Token } from 'prismjs'
// import 'prismjs/components/prism-python'
import * as QT from '../store/queryTypes'

export interface Marker {
    mark: string
    value?: string
    lineNumber?: number
    error?: string
    // nested的時候，需要確認對應的卡是存在的
    cardId?: string
    children?: Marker[]
    comment?: QT.comment
}

export interface MarkerFormat extends Marker {
    inline?: boolean
    multiline?: boolean
    poll?: boolean
    nested?: boolean
    validate?(value: string): boolean
    // 可否編輯
    freeze?: boolean
    meta?: boolean
}

type QueryCard =
    | QT.cocard_cocard
    | QT.ocard_ocard
    | QT.selfcard_selfcard

export interface CardIdentifier {
    queried: boolean
    card?: QueryCard
    symbolName?: string
    oauthorName?: string
    unfound?: boolean
    error?: string
}

interface TextSection {
    root?: boolean
    ticker?: string
    breaker?: boolean
    text: string
}

export interface TokenizedTextSection extends TextSection {
    tokens?: Array<string | Token>
    markers?: Marker[]
    symbols?: Set<string>
    card?: CardIdentifier
}

export const MARKER_FORMAT: Record<string, MarkerFormat> = {
    // srcId: { mark: '[_srcId]', inline: true, meta: true, freeze: true, },
    // srcType: { mark: '[_srcType]', inline: true, meta: true, freeze: true, },
    srcTitle: { mark: '[_srcTitle]', inline: true, meta: true, freeze: true, },
    srcPublishDate: { mark: '[_srcPublishDate]', inline: true, meta: true, freeze: true, },

    // '_oauthor': {},
    // '_url': {},

    pros: { mark: '[+]', multiline: true },
    cons: { mark: '[-]', multiline: true },
    price: { mark: '[price]', inline: true, validate: a => !isNaN(parseFloat(a)) },
    // ticker: { mark: '[car]', nested: true },
    card: { mark: '[card]', nested: true },
    note: { mark: '[]', multiline: true }
    // contentTitle: { mark: 'title', syntax: '[卡]', multi: false },
}

export const TICKER_ALLOWED_MARKERS: MarkerFormat[] = [MARKER_FORMAT.pros, MARKER_FORMAT.cons, MARKER_FORMAT.price]
export const WEBPAGE_ALLOWED_MARKERS: MarkerFormat[] = [MARKER_FORMAT.card, MARKER_FORMAT.note]


const t1 = `[start]test
[intro]
1st line starter
2nd line starter

[you_are] ()用戶 ()業內 ()行業相關 ()插花

[+]
- 全美市占率第一 (source → webpage card)
- 為搶佔市場需燒錢，美國餐飲價格高，外送需求不如亞洲國家來的大
- $AAA

[-]
- 美國配送成本高
- 燒錢行業
- 疫情關係拉高業績，未來
- 還在賠錢中

[verdict] []買 []賣 []觀望
[verdict理由]

[target_price] 31

atest
`
const t2 = `
[topic]
- [[IPO]]
- [[網路服務]]
- [[App]]
- [[App]] *錯誤：本條目已經建立，將忽略
- 

[link]
- (Home)[…] {validator: ‘(Home)[*]’, validateMsg: ‘格式須為(Home)[*]’}
- (Yahoo)[…]
- (Wiki)[…]
=====================
`
export const t3 = `
$AA
[+]
Plus 1
[-]
Minus 1
[price]12

$BB
[+]
Plus 1
[-]
Minus 1
[price]15

---

[]
Comment 1
Comment 2
`

const t4 = `
$FUSE
[+]
收購金額龐大：$750百萬 - $3十億
主席Jim Ross ，SPDR基金主席，SPY創始人，黃金ETF GLD創始人
收購對象：金融科技公司，可能是比特幣
可能是BlockFi：交易電子貨幣，用戶可從自己的加密貨幣裡賺取利息的公司，可抵押電子貨幣貸款美金
BlockFi去年成長十倍，營收達1億美元
2021年第1季宣布收購對象
[]70股@11.11，目標130股

$FTOC
The Bancorp第4間空殼公司
The Bancorp資助過SoFi，合作夥伴，可以收購SoFi
7.5億規模，足夠大到SoFi


$AACQ
軟件
Charles Drucker，金融科技專家
6.3億規模

---
---
---

[note]
SPAC炒作需要的2大：人物、故事
這3家都可能收購SoFI、BlockFi
這3家後台背景強大，收溝資金規模大
最喜歡$FUSE
不覺得有新能源電動車SPAC漲幅大
成功案例：Open Lending
`

const GRAMMAR = {
    'multiline': {
        pattern: /^\[[^\]]*\](?:\n[^\[\n]+)+/m,
        inside: {
            'marker': {
                pattern: /^\[[^\]]*\]$/m,
            },
            'line-value': {
                pattern: /^.+$/m,
                inside: {
                    'ticker': { pattern: /\$[A-Z]+/ },
                    'topic': { pattern: /\[\[something\]\]/u },
                }
            },
            // 'list-string': {
            //     pattern: /^[-]+\s.+$/m,
            // },
        }
    },
    'inline': {
        pattern: /^\[[^\]]+\].*$/m,
        inside: {
            'marker': {
                pattern: /^\[[^\]]+\]/,
            },
            'value': {
                pattern: /^.+$/,
                inside: {
                    'ticker': { pattern: /\$[A-Z]+/ },
                    'topic': { pattern: /\[\[something\]\]/u },
                }
            }
        }
    },
    'ticker': { pattern: /\$[A-Z]+/ },
    'topic': { pattern: /\[\[something\]\]/u },
    // 'radio': {
    //   pattern: /[\s\t]+\[\w?\]\p{L}+/u,
    //   // greedy: true
    // },
}

const SYMBOL_GRAMMAR = {
    'ticker': GRAMMAR.ticker,
    'topic': GRAMMAR.topic,
}

const SECTION_GRAMMAR = {
    'sect-ticker': {
        pattern: /^(?:-{3,})?\$[a-zA-Z@]+(?:-{3,})?$/m,
    },
    'sect-breaker': {
        pattern: /^-{3}$/m,
    },
    'sect-url': {
        pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/m,
    }
}

// --- Helpers ---

function tokensToText(tokens: Array<string | Token>): string {
    let t: string = ''
    for (const e of tokens) {
        if (typeof e === 'string')
            t += e
        else if (Array.isArray(e.content))
            t += tokensToText(e.content)
        else if (typeof e.content === 'string')
            t += e.content
        else
            throw new Error()
    }
    return t
}

// --- Tokenizers ---

function tokenize(text: string): [Array<string | Token>, { markers: Marker[], symbols: Set<string> }] {
    // function _autoComplete(tokens: Array<string | Token>): string {
    //     /** 將簡化的格式轉為正式輸入的格式，例如：$AA -> [card]$AA@some_oauthor，返回text（需再重跑一次tokenizer） */
    //     return ""
    // }
    const symbols: Set<string> = new Set()

    function _toMarkers(tokens: Array<string | Token>, lineNumber: number = 0): [Marker[], number] {
        let mark: string | undefined
        let markers: Marker[] = []
        for (const e of tokens) {
            if (typeof (e) === 'string') {
                if (e === '\n') lineNumber += 1
                // tokens.push(e)
            } else if (e.type === 'marker' && typeof (e.content) === 'string') {
                mark = e.content
            } else if (e.type === 'value' && Array.isArray(e.content) && mark !== undefined) {
                const value = e.content.reduce<string>((acc, cur) => {
                    if (typeof cur === 'string')
                        return acc + cur
                    else if (typeof cur.content === 'string')
                        return acc + cur.content
                    else
                        throw new Error('')
                }, '')
                markers.push({ mark, value, lineNumber })
                // 填充symbols
                _toMarkers(e.content, lineNumber)
            } else if (e.type === 'line-value' && Array.isArray(e.content) && mark !== undefined) {
                const value = e.content.reduce<string>((acc, cur) => {
                    if (typeof cur === 'string')
                        return acc + cur
                    else if (typeof cur.content === 'string')
                        return acc + cur.content
                    else
                        throw new Error('')
                }, '')
                markers.push({ mark, value, lineNumber })
                // 填充symbols
                _toMarkers(e.content, lineNumber)
            } else if (e.type === 'inline' && Array.isArray(e.content)) {
                const [_markers, _lineNumber] = _toMarkers(e.content, lineNumber)
                lineNumber = _lineNumber
                markers = markers.concat(_markers)
            } else if (e.type === 'multiline' && Array.isArray(e.content)) {
                const [_markers, _lineNumber] = _toMarkers(e.content, lineNumber)
                lineNumber = _lineNumber
                markers = markers.concat(_markers)
            } else if (e.type === 'ticker' && typeof (e.content) === 'string') {
                symbols.add(e.content)
            } else if (e.type === 'topic' && typeof (e.content) === 'string') {
                symbols.add(e.content)
            } else {
                throw new Error(JSON.stringify(e))
            }
        }
        return [markers, lineNumber]
    }
    // const tokens = _autoComplete(Prism.tokenize(text, grammar))
    const tokens = Prism.tokenize(text, GRAMMAR)
    const [markers, _] = _toMarkers(tokens)
    return [tokens, { markers, symbols }]
}

export function tokenizeSymbol(text: string): Array<string | Token> {
    /** 將text中的symbol($AA, [[Topic]])轉成token */
    return Prism.tokenize(text, SYMBOL_GRAMMAR)
}

export function validate(items: Marker[], allowedMarkers: MarkerFormat[]): Marker[] {
    for (const e of items) {
        const format = allowedMarkers.find(f => f.mark === e.mark)
        if (format === undefined) {
            e.error = '不在允許的markers中'
            continue
        }
        if (e.value === undefined) {
            e.error = '沒有value'
            continue
        }
        if (format.validate && !format.validate(e.value)) {
            e.error = 'value不符合格式'
            continue
        }
        if (format.inline) {
            const filtered = items.filter(e => e.mark === format.mark)
            for (let i = 0; i < filtered.length - 1; i++) {
                filtered[i].error = '只能define一次，最後一個會被保留'
            }
        }
        // if (e.mark === MARKER_FORMAT.card.mark && getCardId) {
        //     getCardId(e.value)
        //         .then(result => {
        //             if (result === null) {
        //                 e.error = '找不到對應的card'
        //             } else {
        //                 e.cardId = result
        //             }
        //         })
        // }
        if (e.children) {
            if (format.nested) {
                // TODO: 當前只有ticker可以nested，應該要靈活一些
                e.children = validate(e.children, TICKER_ALLOWED_MARKERS)
            } else {
                e.error = '不允許nested'
            }
        }
    }
    return items
}

export function tokenizeSection(
    text: string,
    // symbolCardDict: Record<string, CardIdentifier>,
    nestedCards: CardIdentifier[],
    oauthorName?: string,
    allowedSects: ('ticker' | 'topic')[] = ['ticker', 'topic'],
    rootFormat: MarkerFormat[] = WEBPAGE_ALLOWED_MARKERS,)
    : [TokenizedTextSection[], {
        symbols: Set<string>,
        // symbolCardDict: Record<string, CardIdentifier>
        nestedCards: CardIdentifier[],
    }] {
    /**
     * 步驟：text -> text sections -> grouped [tokens, markers, symbols] -> for each group, validate markers, decorate tokens -> render
     * render(groupedTokens): for each group: for each token: render(token)
     */
    const tokens = Prism.tokenize(text, SECTION_GRAMMAR)
    const sects: TextSection[] = []
    let _sect: TextSection | null = null
    for (const e of tokens) {
        if (typeof e === 'string') {
            if (_sect === null)
                _sect = { text: e }
            else
                _sect.text += e
        } else if (e.type === 'sect-ticker' && allowedSects.includes('ticker')) {
            if (_sect !== null)
                sects.push(_sect)
            _sect = { ticker: e.content as string, text: '' }
        } else if (e.type === 'sect-breaker') {
            if (_sect !== null) sects.push(_sect)
            sects.push({ breaker: true, text: e.content as string })
            _sect = null
        }
    }
    if (_sect !== null)
        sects.push(_sect)

    // 從後方算起第一個有效的text為root，其餘text均會被ignore
    for (let i = sects.length - 1; i >= 0; i--) {
        if (sects[i].ticker === undefined && !sects[i].breaker) {
            sects[i].root = true
            break
        }
    }

    const _waitToQueryCards: CardIdentifier[] = []
    function getCardIdentifier(symbolName: string, oauthor?: string): CardIdentifier {
        // const realSymbol = oauthor ? `${symbol}@${oauthor}` : symbol
        let card = nestedCards.find((e) => e.symbolName === symbolName)
        if (card === undefined) {
            card = { symbolName, queried: false }
            _waitToQueryCards.push(card)
        }
        return card
    }

    // 對有效的section（ie, root, ticker)做tokenize、validate，其餘section不做處理，render時直接當作comment string
    const tokenizedSects: TokenizedTextSection[] = sects.map(
        function (e) {
            if (e.root) {
                const [tokens, { markers: _markers, symbols }] = tokenize(e.text)
                const markers = validate(_markers, rootFormat)
                return { ...e, tokens, markers, symbols }
            } else if (e.ticker) {
                const [tokens, { markers: _markers, symbols }] = tokenize(e.text)
                const markers = validate(_markers, TICKER_ALLOWED_MARKERS)
                return { ...e, tokens, markers, symbols, card: getCardIdentifier(e.ticker, oauthorName) }
            }
            return e
        }
    )

    // 集合每個sect的symbols
    // TODO: 尚未考慮ticker-symbol，ie $AA@someone
    const symbols: Set<string> = new Set()
    for (const sect of tokenizedSects) {
        for (const e of sect.symbols ?? [])
            symbols.add(e)
    }


    return [tokenizedSects, { symbols, nestedCards: [...nestedCards, ..._waitToQueryCards] }]
}

export function findUrl(text: string): { url: string | undefined, textAfterUrl: string } {
    /** 從首先出現的單行URL開始，擷取從URL以下的文章 */
    const tokens = Prism.tokenize(text, SECTION_GRAMMAR)
    let url: string | undefined
    const _tokensAfterUrl: Array<string | Token> = []
    for (const e of tokens) {
        if (url === undefined) {
            if (typeof e !== 'string' && e.type === 'sect-url')
                url = e.content as string
            else
                continue
        }
        _tokensAfterUrl.push(e)
    }
    return { url, textAfterUrl: tokensToText(_tokensAfterUrl) }
}

// --- Comments Ops ---

export function commentsToText(comments: QT.comment[], allowedMarkers: MarkerFormat[]): string {
    /**
     * TODO:
     * - netsed card
     * - 排序、filter
     * - 再編輯的情況：poll需要涵蓋上次投票&本次全新的
     */
    // let text: string = ''
    const lines: string[] = []
    for (const marker of allowedMarkers) {
        if (marker.inline) {
            const cm = comments.find(e => e.meta?.mark === marker.mark)
            lines.push(`${marker.mark}${cm?.text ?? ''}`)
        } else if (marker.multiline) {
            lines.push(`${marker.mark}`)
            for (const e of comments.filter(e => e.meta?.mark === marker.mark)) {
                lines.push(`${e.text}`)
            }
            lines.push('')
        }
    }
    return lines.join('\n')
}

// ------- Deprecated --------

// function parse(text: string, pattern: string) {
//     /** 將文本依每行找出pattern所對應的string, linenumber
//      * ----範例, pattern='[+]'----
//      * [+]第一行   -> ['第1行', 1]
//      * [+] 第3行  ->  ['第3行', 2]
//      * [+]        ->  (忽略)
//      * [-]
//      * [-]
//      * [+] aaa    -> ['aaa', O]
//      * [目標價] 129.3
//      */
//     const matches: [string, number][] = []  // [match, linenumber]
//     const lines = text.split('\n')
//     for (let i = 0; i < lines.length; i++) {
//         if (lines[i].startsWith(pattern)) {
//             const match = lines[i].replace(pattern, '').trim()
//             if (match.length > 0) {
//                 matches.push([match, i])
//             }
//         }
//         // matches.push({match: })
//     }
//     return matches
// }
// export function tokenize(text: string): [Array<string | Token>, Marker[]] {
//     function _toMarkers(tokens: Array<string | Token>, lineNumber: number = 0): [Marker[], number] {
//         let nested: Marker | null = null
//         let mark: string | undefined
//         let markers: Marker[] = []
//         for (const e of tokens) {
//             if (nested) {
//                 if (typeof (e) === 'string') {
//                     lineNumber += e.split('\n').length - 1
//                     // tokens.push(e)
//                 } else if (e.type === 'marker' && typeof (e.content) === 'string') {
//                     mark = e.content
//                 } else if (e.type === 'string' && typeof (e.content) === 'string' && mark !== undefined) {
//                     nested.children?.push({ mark, value: e.content, lineNumber })
//                 } else if (e.type === 'list-string' && typeof (e.content) === 'string' && mark !== undefined) {
//                     nested.children?.push({ mark, value: e.content, lineNumber })
//                 } else if (e.type === 'inline' && Array.isArray(e.content)) {
//                     const [_markers, _lineNumber] = _toMarkers(e.content, lineNumber)
//                     lineNumber = _lineNumber
//                     nested.children = nested.children?.concat(_markers)
//                 } else if (e.type === 'multiline' && Array.isArray(e.content)) {
//                     const [_markers, _lineNumber] = _toMarkers(e.content, lineNumber)
//                     lineNumber = _lineNumber
//                     nested.children = nested.children?.concat(_markers)
//                 } else if (e.type === 'inline-ticker') {
//                     markers.push(nested)
//                     nested = { mark: e.content as string, children: [], lineNumber }
//                 } else {
//                     throw new Error(JSON.stringify(e))
//                 }
//             } else {
//                 if (typeof (e) === 'string') {
//                     if (e === '\n') lineNumber += 1
//                     // tokens.push(e)
//                 } else if (e.type === 'marker' && typeof (e.content) === 'string') {
//                     mark = e.content
//                 } else if (e.type === 'string' && typeof (e.content) === 'string' && mark !== undefined) {
//                     markers.push({ mark, value: e.content, lineNumber })
//                 } else if (e.type === 'list-string' && typeof (e.content) === 'string' && mark !== undefined) {
//                     markers.push({ mark, value: e.content, lineNumber })
//                 } else if (e.type === 'line-string' && typeof (e.content) === 'string' && mark !== undefined) {
//                     markers.push({ mark, value: e.content, lineNumber })
//                 } else if (e.type === 'inline' && Array.isArray(e.content)) {
//                     const [_markers, _lineNumber] = _toMarkers(e.content, lineNumber)
//                     lineNumber = _lineNumber
//                     markers = markers.concat(_markers)
//                 } else if (e.type === 'multiline' && Array.isArray(e.content)) {
//                     const [_markers, _lineNumber] = _toMarkers(e.content, lineNumber)
//                     lineNumber = _lineNumber
//                     markers = markers.concat(_markers)
//                 } else if (e.type === 'inline-ticker') {
//                     nested = { mark: e.content as string, children: [], lineNumber }
//                 } else {
//                     throw new Error(JSON.stringify(e))
//                 }
//             }
//         }
//         if (nested)
//             markers.push(nested)
//         return [markers, lineNumber]
//     }
//     // const tokens = _autoComplete(Prism.tokenize(text, grammar))
//     const tokens = Prism.tokenize(text, grammar)
//     const [markers, _] = _toMarkers(tokens)
//     return [tokens, markers]
// }

// class Formatter {
//     allowedMarkers: MarkerFormat[]
//     constructor(allowedMarkers: MarkerFormat[]) {
//         this.allowedMarkers = allowedMarkers
//     }
//     // isIn(marker: Marker): boolean {
//     //     return this.allowedMarkers.find(e => e.mark === marker.mark)
//     // }
//     check(item: Marker,): string | null {
//         return null
//     }
// }
// const tickerCardFormatter = new Formatter([FORMAT_DICT.pros, FORMAT_DICT.cons, FORMAT_DICT.price])

// const baseFormatter = {
//     allowedMarkers: [],
//     isIn: function (marker: Marker) {
//         return this.allowedMarkers.includes()
//     }
// }

// const TICKER_MARKER_FORMATTER = {
//     ...baseFormatter,
//     allowedMarkers: [FORMAT_DICT.pros, FORMAT_DICT.cons, FORMAT_DICT.price],
// }

function textToMarkers(text: string, allowedMarkers: MarkerFormat[]): Marker[] {
    // const [_tokens, _markers] = tokenize(text)
    // // return validate(_markers, allowedMarkers).filter(e => !e.error && e.value !== undefined)
    // return validate(_markers, allowedMarkers)
    const expectTextGroup = [
        { root: true, markers: [] },
        { ticker: "$AA", card: { unfound: true }, markers: [] },
        { ticker: "$CC", _ticker: "$AA@someone", markers: [], error: "" },
    ]
    for (const e of expectTextGroup) {
        if (e.card && e.card.unfound) {
            throw new Error("")
        } else if (e.root) {
            // createComment(cardId, cardType, markers)
        } else {
            // createComment(cardId, cardType, markers)
        }
    }
    return []
}


// export function textToComments(text: string, allowedMarkers: MarkerFormat[], src?: string): QT.CommentInput[] {
//     let comments: QT.CommentInput[] = []
//     const [_, _markers] = tokenize(text)
//     for (const e of validate(_markers, allowedMarkers)) {
//         if (e.error || e.value === undefined)
//             continue
//         if (e.children) {
//         } else {
//             comments.push({ mark: e.mark, src, text: e.value, })
//         }
//     }
//     return comments
// }