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

module.exports = {
    normalizeURL,
    getURLsFromHTML,
}