

const Pagination = async (pages, modules, count) => {

    if (count == undefined) {
        count = 5
    }
    let page = pages
    let limit = page * count
    let skip = (page - 1) * count
    let total = await modules.countDocuments()
    total = Math.ceil(total / count)
    return { limit, skip, total }
}
module.exports = { Pagination }