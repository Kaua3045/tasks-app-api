const accessTokenSchema = require('./access-token-schema')
const authBodySchema = require('./auth-body-schema')
const meAccountSchema = require('./me-account-schema')

const errorSchema = require('./error-schema')

module.exports = {
  accessTokenSchema,
  authBodySchema,
  meAccountSchema,
  errorSchema
}