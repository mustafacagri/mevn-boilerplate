const fail = require('./fail')

module.exports = (res, message, status = 200) => {
  return res.status(status).json(new fail(message))
}
