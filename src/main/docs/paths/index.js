const authPath = require('./account/auth-path')
const mePath = require('./account/me-path')
const addAccountPath = require('./account/add-account-path')

const addTaskPath = require('./task/add-task-path')
const listTaskByIdPath = require('./task/list-task-by-id-path')

module.exports = {
  authPath,
  mePath,
  addAccountPath,
  addTaskPath,
  listTaskByIdPath
}