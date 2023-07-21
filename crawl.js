const { JSDOM } = require('jsdom')
const path = require('node:path')

const normalizeURL = (url) => {
    const nUrl = new URL(url)
    let path = nUrl.pathname
    let firstPathChar = path[0]
    while (firstPathChar === '/') {
        path = path.slice(1)
        firstPathChar = path[0]
    }
    if (path !== "") {
        let lastPathChar = path[path.length - 1]
        while (lastPathChar === '/') {
            path = path.slice(0, -1)
            lastPathChar = path[path.length - 1]
        }
    }
    return `${nUrl.hostname}/${path}`
}

const getURLsFromHTML = (htmlBody, baseURL) => {
    const dom = new JSDOM(htmlBody)
    const alist = dom.window.document.querySelectorAll('a')
    const newlist = []
    for (let atag of alist) {
        const url = new URL(atag.href, baseURL)
        newlist.push(url.href)
    }
    return newlist
}

async function crawlPage(baseUrl, currentUrl, pages) {
    let curUrl = currentUrl
    if (!curUrl) {
        curUrl = baseUrl
    }
    const base = new URL(baseUrl)
    const current = new URL(curUrl)
    
    const normCurrent = normalizeURL(current)
    const normBase = normalizeURL(base)
    if (normCurrent in pages) {
        pages[normCurrent]++
        return pages
    } else if (normCurrent === normBase) {
        pages[normCurrent] = 0
    } else {
        pages[normCurrent] = 1
    }
    
    if (base.hostname !== current.hostname) {
        return pages
    }

    try {
    console.log(`Crawling ${current}`)
    const response = await fetch(current)
    const body = await response.text()
    
    if (await response.status >= 300) {
        console.log(`Response status code: ${response.status}`)
        return pages
    }
    if (!response.headers.get('content-type').includes('text/html')) {
        console.log(`Response content type: ${response.headers['content-type']}`)
        return pages
    }

    const newUrls = getURLsFromHTML(body, base)

    for (let u of newUrls) {
        pages  = await crawlPage(base, u, pages)
    }

    } catch (err) {
        console.log(err)
        return pages

    }
    return pages


}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}