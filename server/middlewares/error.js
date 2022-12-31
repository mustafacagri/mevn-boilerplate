const ErrorResponse = require('../utils/errorResponse')
const { response } = require('../classes')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  console.log(res)

  error.message = err.message

  console.log(err, 'err.name')

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = new ErrorResponse(message, 400)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400)
  }

  console.log(error, 'error')

  res.status(error.statusCode || 500).json(new response.fail(error.message || 'Server Error'))
}

module.exports = errorHandler
