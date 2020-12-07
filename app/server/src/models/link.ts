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



export async function createLink(parsed: ParsedUrl, page: PA.Page, contentType?: PA.LinkContentType, contentId?: string, contentAuthorId?: string): Promise<PA.Link | null> {
    return await prisma.link.create({
        data: {
            url: parsed.url,
            domain: parsed.domain,
            contentType,
            contentId,
            contentAuthorId,
            page: { connect: { id: page.id } }
        }
    })
}


export async function getOrCreateLink(url: string, page: PA.Page, contentType?: PA.LinkContentType, contentId?: string, contentAuthorId?: string): Promise<[PA.Link | null, boolean]> {
    const [res, parsed] = await getLink(url)
    if (res !== null)
        return [res, false]
    const link = await prisma.link.create({
        data: {
            url: parsed.url,
            domain: parsed.domain,
            contentType,
            contentId,
            contentAuthorId,
            page: { connect: { id: page.id } }
        }
    })
    return [link, true]
}


