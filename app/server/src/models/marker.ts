export interface CommentMeta {
    mark: string
    src?: string
}

// type CommentMeta = {
//     mark?: CommentMark
//     order?: number
//     // 與其他comments做連結（alternatives & fights)
//     commentIds?: number[]
//     // 這comment是從哪個commment更新
//     updatedFromId?: number

//     // 目前顯示options都直接寫在前端，不記錄在comment-meta
//     showAs?: string
//     showReplyDirection?: string
//     disableReply?: boolean
//     // 確認input符合需要的格式（數字、...）
//     validator?: string
//   }

export interface Marker {
    mark: string
    value?: string
    lineNumber?: number
    error?: string
    // nested的時候，需要確認對應的卡是存在的
    cardId?: string
    children?: Marker[]
    // comment?: QT.comment
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


// --- Deprecated 

// --- Enums, types

interface CommentProps {
    symbol: string
    name: string
    wiki: string
    yfinance: string
    homesite: string
    redirect: string
}

enum CommentMark {
    // Only in cocard
    Props = 'props',
    Topics = 'topics',
    Tickers = 'tickers',
    Links = 'links',
    Tags = 'tags',
    Alternatives = 'alternatives',
    Act = 'act',
    ShowView = 'shortview',
    LongView = 'longview',
    Intro = 'intro',
    VoteCreate = 'votecreate',

    // Ticker selfcard, ocard
    Pros = 'pros',
    Cons = 'cons',
    TargetPrice = 'targetprice',

    // Common
    Ask = 'ask',
    Info = 'info',
    Fight = 'fight',
}

type PollTemplate = {
    choices: string[]
}

export type CardMeta = {
    tickers?: string[]
    topics?: string[]
    links?: string[]
    // webpage content
    contentTitle?: string
    contentPublishedAt?: string
    // selfSymbol?: string | null
    // pros?: CommentTemplate
    // cons?: CommentTemplate
    // act?: CommentTemplate
    // wiki?: string | null
    // intro?: CommentTemplate
    // shortView?: CommentTemplate
    // longView?: CommentTemplate
    // srcAuthor?: string | null
    // srcTitle?: string | null
    // voteCreate?: CommentTemplate
}

type CommentTemplate = {
    meta: CommentMeta
    text: string
    poll?: PollTemplate
}