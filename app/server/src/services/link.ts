function resolveYoutube(url: string) { }

function unifyUrl(url: string) {
    /** 
     * 不同的URL(eg: short-url)可能指向同一頁面，需整合
     * - 特別是URL params
     */
    let u = new URL(url)
    // Resolve URL for youtube, ...

    return {
        domain: u.hostname,
    }
}