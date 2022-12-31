const success = require('./success')

module.exports = (res, data, message) => {
  return res.json(new success(data, null, null, message))
}
