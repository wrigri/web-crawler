const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
    if (process.argv.length === 2) {
        console.error('Expected base URL as argument.')
        process.exit(1)
    } else if (process.argv.length > 3) {
        console.error('Too many arguments.')
        process.exit(1)
    }
    const baseURL = process.argv[2]
    console.log(`Starting crawler at ${baseURL}...`)

    const pages = await crawlPage(baseURL, "", {})
    printReport(pages)
}

main()