const accessTokenSchema = require('./access-token-schema')
const meAccountSchema = require('./me-account-schema')
const addAccountResponseSchema = require('./add-account-response-schema')
const accountConfirmedResponseSchema = require('./account-confirmed-response-schema')

const authBodySchema = require('./auth-body-schema')
const addAccountBodySchema = require('./add-account-body-schema')

module.exports = {
  accessTokenSchema,
  meAccountSchema,
  addAccountResponseSchema,
  authBodySchema,
  addAccountBodySchema,
  accountConfirmedResponseSchema
}