const badRequest = require('./bad-request')
const unauthorized = require('./unauthorized')
const serverError = require('./server-error')

module.exports = {
  badRequest,
  unauthorized,
  serverError
}