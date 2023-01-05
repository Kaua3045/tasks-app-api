const addTaskBodySchema = require('./add-task-body-schema')
const addTaskResponseSchema = require('./add-task-response-schema')
const listTaskByIdResponseSchema = require('./list-task-by-id-response-schema')
const listTasksByUserIdResponseSchema = require ('./list-tasks-by-user-id-response-schema')

module.exports = {
  addTaskBodySchema,
  addTaskResponseSchema,
  listTaskByIdResponseSchema,
  listTasksByUserIdResponseSchema
}