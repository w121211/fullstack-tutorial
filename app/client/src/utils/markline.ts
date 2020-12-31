import * as QT from '../store/queryTypes'

interface Marker {
    mark: string
    syntax: string
    multi?: boolean
    validator?(a: string): boolean
    freeze?: boolean
}

// 會依照item順序產生
const marker: Record<string, Marker> = {
    pros: { mark: 'pros', syntax: '[+]', multi: true },
    cons: { mark: 'cons', syntax: '[-]', multi: true },
    price: { mark: 'price', syntax: '[目標價]', multi: false, validator: a => !isNaN(parseFloat(a)) },
    ticker: { mark: 'ticker', syntax: '[卡]', multi: true },

    contentTitle: { mark: 'contentTitle', syntax: '[標題]', multi: false, freeze: true },
    // contentTitle: { mark: 'title', syntax: '[卡]', multi: false },
}

export const tickerMarkers: Marker[] = [marker.pros, marker.cons, marker.price]
export const webpageMarkers: Marker[] = [marker.ticker]


// const re = /^\[\+\](.+)$/g
// let m
// while ((m = re.exec(t)) !== null) {   
//     console.log('---')
//     console.log(m.index, re.lastIndex)
//     m.forEach((match, groupIndex) => {
//         console.log(groupIndex, match);
//     })
// }

function parse(text: string, pattern: string) {
    /** 將文本依每行找出pattern所對應的string, linenumber
     * ----範例, pattern='[+]'----
     * [+]第一行   -> ['第1行', 1]
     * [+] 第3行  ->  ['第3行', 2]
     * [+]        ->  (忽略)
     * [-]
     * [-]
     * [+] aaa    -> ['aaa', O]
     * [目標價] 129.3
     */
    const matches: [string, number][] = []  // [match, linenumber]
    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith(pattern)) {
            const match = lines[i].replace(pattern, '').trim()
            if (match.length > 0) {
                matches.push([match, i])
            }
        }
        // matches.push({match: })
    }
    return matches
}

export function textToComments(text: string, markers: Marker[] = tickerMarkers, src?: string): QT.CommentInput[] {
    let comments: QT.CommentInput[] = []
    for (const mk of markers) {
        const temp: QT.CommentInput[] = parse(text, mk.syntax)
            .map(([match, linenumber]) => ({
                mark: mk.mark,
                src: src,
                text: match
            }))
        if (mk.multi) {
            comments = comments.concat(temp)
        } else if (temp.length > 0) {
            comments.push(temp.slice(-1)[0])
        }
    }
    return comments
}

export function commentsToText(comments: QT.comment[] = [], markers: Marker[] = tickerMarkers): string {
    let text: string = ''
    for (const mk of markers) {
        const temp: string[] = []
        for (const comment of comments) {
            if (comment.meta?.mark === mk.mark) {
                temp.push(`${mk.syntax}${comment.text}`)
            }
        }
        // 新的一行
        if (mk.multi || temp.length === 0) {
            temp.push(`${mk.syntax}`)
        }
        text += `${temp.join('\n')}\n\n`
    }
    return text
}


function getMeta(comments: QT.comment[]) {
}