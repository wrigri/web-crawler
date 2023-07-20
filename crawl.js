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

module.exports = {
    normalizeURL
}