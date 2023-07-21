const printReport = (pages) => {
    console.log('========== Starting Report ==========')
    while (Object.keys(pages).length > 0) {
        let max = 0
        let entry = null
        for (let [k, v] of Object.entries(pages)) {
            if (v > max) {
                max = v
                entry = k
            }
        }
        console.log(`Found ${max} internal links to ${entry}`)
        delete pages[entry]

    }
}

module.exports = {
    printReport,
}