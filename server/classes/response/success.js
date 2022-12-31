class Response {
  constructor(data,  count = null,  pagination = null, message = null) {
    this.isSuccess = true
    this.data = data
    this.count = count
    this.message = message
    this.pagination = pagination
  }
}

module.exports = Response
