const fail = require('./fail')

module.exports = (res, message, status = 200) => {
  if (message && typeof message === 'object') {
    message = `<ul><li>${message.join('</li><li>')}</li></ul>`
  }

  return res.status(status).json(new fail(message))
}
