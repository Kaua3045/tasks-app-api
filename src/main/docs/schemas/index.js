const {
  accessTokenSchema,
  authBodySchema,
  meAccountSchema,
  addAccountBodySchema,
  addAccountResponseSchema
} = require('./account')

const {
  addTaskBodySchema,
  addTaskResponseSchema,
  listTaskByIdResponseSchema
} = require('./task')

const errorSchema = require('./error-schema')

module.exports = {
  accessTokenSchema,
  authBodySchema,
  meAccountSchema,
  addAccountBodySchema,
  addAccountResponseSchema,
  addTaskBodySchema,
  addTaskResponseSchema,
  listTaskByIdResponseSchema,
  errorSchema
}