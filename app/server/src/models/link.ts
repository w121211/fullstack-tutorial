// import * as request from 'request'
import got from 'got'
import * as PA from '@prisma/client'

const prisma = new PA.PrismaClient({
    errorFormat: "pretty",
    log: ['query', 'info', 'warn'],
})


interface ParsedUrl {
    url: string,
    domain: string
}

function parseUrl(url: string): ParsedUrl {
    /** 
     * 不同的URL(eg: short-url)可能指向同一頁面，需整合
     * - 特別是URL params
     */
    let u = new URL(url)
    // Resolve URL for youtube, ...
    return {
        url: url,
        domain: u.hostname,
    }
}

export async function getLink(url: string): Promise<[PA.Link | null, ParsedUrl]> {
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

export async function getOrCreateLink(url: string, contentType?: PA.LinkContentType, contentId?: string, contentAuthorId?: string): Promise<[PA.Link | null, boolean]> {
    const [res, parsed] = await getLink(url)
    if (res !== null)
        return [res, false]
    const link = await prisma.link.create({
        data: {
            url: parsed.url,
            domain: parsed.domain,
            contentType,
            contentId,
            // contentAuthorId,
        }
    })
    return [link, true]
}

function toOauthorName(domain: string, domainAuthorName: string) {
    return `@${domainAuthorName}:${domain}`
}

export async function fetchLink(url: string) {
    /** 目前只支援youtube */
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
            oauthorName: toOauthorName(domain, j.ownerChannelName),
            contentId: vid,
            // 可能會有redirect, short-url
            resolvedUrl: url,
            title: j.title.simpleText,
            publishDate: new Date(j.publishDate).toISOString(),
            // channelId: j.externalChannelId,
            // channelName: j.ownerChannelName,
            // viewCount: j.viewCount
        }
    }
    throw new Error()
}