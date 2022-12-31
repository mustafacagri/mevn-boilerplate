const { response } = require('../classes')


exports.getGeneric = async (req, res) => {
  try {
    res.json(res.dbQuery)
  } catch (err) {
    res.status(500).json(new response.fail(err.message))
  }
}