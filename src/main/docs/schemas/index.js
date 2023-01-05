const accessTokenSchema = require('./access-token-schema')
const meAccountSchema = require('./me-account-schema')
const addAccountResponseSchema = require('./add-account-response-schema')

const authBodySchema = require('./auth-body-schema')
const addAccountBodySchema = require('./add-account-body-schema')

const errorSchema = require('./error-schema')

module.exports = {
  accessTokenSchema,
  authBodySchema,
  meAccountSchema,
  addAccountBodySchema,
  addAccountResponseSchema,
  errorSchema
}