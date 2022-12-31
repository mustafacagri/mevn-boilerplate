const requireDir = require('require-dir')
const models = requireDir('./', { recurse: true })

module.exports = models
