const { response } = require('../../classes')
const { controllers: { check: STRINGS } = {} } = require('../../MAGIC_STRINGS')

exports.check = async (req, res) => {
  response.successed(res, null, null)
}
