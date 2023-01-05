const accessTokenSchema = require('./access-token-schema')
const meAccountSchema = require('./me-account-schema')
const addAccountResponseSchema = require('./add-account-response-schema')
const addTaskResponseSchema = require('./add-task-response-schema')

const authBodySchema = require('./auth-body-schema')
const addAccountBodySchema = require('./add-account-body-schema')
const addTaskBodySchema = require('./add-task-body-schema')

const errorSchema = require('./error-schema')

module.exports = {
  accessTokenSchema,
  authBodySchema,
  meAccountSchema,
  addAccountBodySchema,
  addAccountResponseSchema,
  addTaskBodySchema,
  addTaskResponseSchema,
  errorSchema
}