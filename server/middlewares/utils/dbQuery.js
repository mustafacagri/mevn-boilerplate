const { response } = require('../../classes')

const dbQuery =
  (model, populate = [], willNotReturn = []) =>
  async (req, res, next) => {
    const CONTANTS = { limitPerPage: 25, defaultPage: 1 }

    let query
    willNotReturn.push('__v')

    // Copy req.query
    const reqQuery = { ...req.query }

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit']

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])

    // Create query string
    let queryStr = JSON.stringify(reqQuery)

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    // Finding resource
    query = model.find(JSON.parse(queryStr))

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ')
      query = query.select(fields)
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || CONTANTS.defaultPage
    const limit = parseInt(req.query.limit, 10) || CONTANTS.limitPerPage
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await model.countDocuments(JSON.parse(queryStr))

    query = query.skip(startIndex).limit(limit)

    if (populate.length > 0) {
      populate.forEach(p => {
        query = query.populate(p)
      })
    }

    // // Executing query
    let results = await query

    results = JSON.stringify(results)
    results = JSON.parse(results)
    // map does not with only results.map if we do not stringify then parse it. strange, right? any idea?

    results.map(item => {
      return willNotReturn.forEach(willBeDeleted => delete item[willBeDeleted])
    })

    // Pagination result
    const pagination = {}

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      }
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      }
    }

    res.dbQuery = new response.success(results, results.length, pagination)

    next()
  }

module.exports = dbQuery
