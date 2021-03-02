export interface Marker {
  mark: string
  value?: string
  error?: string
  // nested的時候，需要確認對應的卡是存在的
  // cardId?: string;
}

export interface MarkerFormat extends Marker {
  inline?: true
  multiline?: true
  poll?: true
  nested?: true
  freeze?: true
  meta?: true
  list?: true

  // 用空array代表自由輸入，例如price
  pollVotes?: string[]

  validater?(value: string): boolean
}

export interface CardLabel {
  // queried: boolean
  // unfound?: boolean
  // error?: string
  symbol: string
  oauthor?: string
  me?: true
}

export interface MarkerLine {
  linenumber: number
  str: string // 這行實際的值（原封不動）

  // 建立這個line的user
  userId?: string
  anchorId?: number

  stampId?: string
  new?: true // 新創的一行，靠此flag創anchor
  noStamp?: true // 在行內還沒有stamp
  broken?: true // 有stamp，但損毀

  src?: string // 對網頁做筆記時，紀錄該網頁的url，視為來源
  // TODO: 還未決定是否需要此項
  oauthor?: string

  // 這行對應的是投票
  poll?: true
  pollId?: number

  // 這行對應的是一個comment
  reply?: true
  commentId?: number

  // 這行是屬於nested
  nested?: true
  nestedCard?: CardLabel

  // 這行的marker
  markonly?: true // 這行是純mark，沒value
  marker?: Marker
}

export interface ExtToken extends Prism.Token {
  content: ExtTokenStream
  linenumber: number
  marker?: Marker
  markerline?: MarkerLine
}

export type ExtTokenStream = string | ExtToken | Array<string | ExtToken>

export interface Section {
  root?: true
  breaker?: true
  ticker?: true
  topic?: true
  // plain?: true

  nestedCard?: CardLabel

  sectToken?: Prism.Token
  bodyTokens: (Prism.Token | string)[]

  // stream: () => (Token | string)[]
  stream?: ExtTokenStream
}

// export interface TokenizedTextSection extends TextSection {
//     card?: CardIdentifier
//     stream: (ExtToken | string)[]
//     // tokens?: Array<string | Token>
//     markers?: Marker[]
//     symbols?: Set<string>
// }
