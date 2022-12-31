const logger = require('../../utils/logger')
class FailedResponse extends Error {
  constructor(message) {
    // super(message)
    super()
    this.message = message
    this.isSuccess = false
    logger.error(`Error.Name: ${this.name} - Error.Stack: ${this.stack}`)
  }
}

module.exports = FailedResponse
