const badRequest = require('./bad-request')
const unauthorized = require('./unauthorized')
const serverError = require('./server-error')
const accessDenied = require('./access-denied')

module.exports = {
  badRequest,
  unauthorized,
  serverError,
  accessDenied
}