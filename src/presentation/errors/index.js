const ServerError = require('./server-error')
const UnauthorizedError = require('./unauthorized-error')
const AccessDenidedError = require('./access-denided-error')
const AccountHasBeenConfirmedError = require('./account-has-been-confirmed-error')

module.exports = {
  ServerError,
  UnauthorizedError,
  AccessDenidedError,
  AccountHasBeenConfirmedError
}