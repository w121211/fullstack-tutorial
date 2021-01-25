// import * as request from 'request'
import got from 'got'
import * as PA from '@prisma/client'
import { MARKER_FORMAT, CommentMeta } from './marker'

interface ParsedUrl {
    url: string,
    domain: string
}

const prisma = new PA.PrismaClient({
    errorFormat: "pretty",
    log: ['query', 'info', 'warn'],
})

function toOauthorName(domain: string, domainAuthorName: string) {
    return `${domainAuthorName}:${domain}`
}

function parseUrl(url: string): ParsedUrl {
    /** 
     * TODO: 不同的URL(eg: short-url)可能指向同一頁面，需整合
     * - 特別是URL params
     */
    let u = new URL(url)
    return {
        url: url,
        domain: u.hostname,
    }
}


interface FetchResult {
    domain: string
    resolvedUrl: string
    oauthorName?: string
    srcId?: string
    srcType: PA.LinkContentType
    srcTitle?: string
    srcPublishDate?: string
}


const fetcher: Record<string, (url: string, domain?: string) => Promise<FetchResult>> = {
    youtube: async function (url: string) {
        const domain = 'youtube'
        const u = new URL(url)
        const vid = new URLSearchParams(u.search).get('v')
        // try {
        // const resp = await got.get('https://youtube.com/get_video_info', { searchParams: { video_id: vid } })
        // } catch (error) {
        //     console.log(error.response.body)
        // }
        const resp = await got.get('https://youtube.com/get_video_info', { searchParams: { video_id: vid } })
        const p = new URLSearchParams(resp.body).get('player_response')
        if (p) {
            const j = JSON.parse(p).microformat.playerMicroformatRenderer
            return {
                domain,
                // TODO: 可能會有redirect, short-url
                resolvedUrl: url,
                oauthorName: toOauthorName(domain, j.ownerChannelName),
                srcId: vid ?? '',
                srcType: PA.LinkContentType.VIDEO,
                srcTitle: j.title.simpleText,
                srcPublishDate: new Date(j.publishDate).toISOString(),
                // channelId: j.externalChannelId,
                // channelName: j.ownerChannelName,
                // viewCount: j.viewCount
            }
        }
        throw new Error()
    },
    default: async function (url, domain) {
        if (domain === undefined)
            throw new Error()
        return {
            domain,
            resolvedUrl: url,
            srcType: PA.LinkContentType.OTHER,
        }
    }
}

async function fetch(url: string): Promise<FetchResult> {
    /** 嘗試連接URL取得來源資訊 */
    const parsed = parseUrl(url)

    let fetched: FetchResult
    if (parsed.domain === 'www.youtube.com') {
        fetched = await fetcher.youtube(parsed.url)
    } else {
        fetched = await fetcher.default(parsed.url, parsed.domain)
    }

    return fetched
}

// --- Database Ops ---

async function getLink(url: string): Promise<[PA.Link | null, ParsedUrl]> {
    // TODO: 這個url尚未resolved, 需要考慮redirect、不同url指向同一個頁面的情況
    const parsed = parseUrl(url)
    const res = await prisma.link.findOne({ where: { url: parsed.url } })
    return [res, parsed]
}

export async function createLink(parsed: ParsedUrl, contentType?: PA.LinkContentType, contentId?: string, contentAuthorId?: string): Promise<PA.Link | null> {
    return await prisma.link.create({
        data: {
            url: parsed.url,
            domain: parsed.domain,
            contentType,
            contentId,
            // contentAuthorId,
        }
    })
}

export async function getOrCreateLink(url: string, botEmail: string): Promise<[PA.Link, { fetched?: FetchResult }]> {
    /** 
     * 給予一個URL，從資料庫中返回該URL對應的link
     * 若link未存在，建立link，同時建立cocard, oauthor
     */
    const [res, parsed] = await getLink(url)

    // Link已存在，直接返回
    if (res !== null)
        return [res, {}]

    // Link未存在，嘗試fetch取得來源資訊，建立link, cocard, oauthor後返回
    const fetched = await fetch(url)

    // 將source meta紀錄在comments中
    const inputs: [CommentMeta, string][] = []
    if (fetched.srcTitle)
        inputs.push([{ mark: MARKER_FORMAT.srcTitle.mark }, fetched.srcTitle])
    if (fetched.srcPublishDate)
        inputs.push([{ mark: MARKER_FORMAT.srcPublishDate.mark }, fetched.srcPublishDate])

    // Database ops
    const oauthor = fetched.oauthorName ?
        await prisma.oauthor.upsert({
            where: { name: fetched.oauthorName },
            create: { name: fetched.oauthorName },
            // update留空等同於getOrCreate
            update: {}
        }) : undefined
    const link = await prisma.link.create({
        data: {
            url: fetched.resolvedUrl,
            domain: fetched.domain,
            contentId: fetched.srcId,
            contentType: fetched.srcType,
            oauthor: oauthor ? { connect: { id: oauthor.id } } : undefined,
            cocard: {
                create: {
                    template: PA.CardTemplate.WEBPAGE,
                    meta: {},
                    comments: {
                        create: inputs.map(
                            function ([meta, text]) {
                                return { isProp: true, meta: { ...meta }, text, user: { connect: { email: botEmail } }, count: { create: {} } }
                            }
                        )
                    }
                }
            }
        }
    })
    return [link, { fetched }]
}