const ServerError = require('./server-error')
const UnauthorizedError = require('./unauthorized-error')
const AccessDenidedError = require('./access-denided-error')
const MissingHeaderError = require('./missing-header-error')

module.exports = {
  ServerError,
  UnauthorizedError,
  AccessDenidedError,
  MissingHeaderError
}