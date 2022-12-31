const requireDir = require('require-dir')
const classes = requireDir('./', { recurse: true })

module.exports = classes
