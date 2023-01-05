const { authPath, mePath, addAccountPath } = require('./account')
const { addTaskPath, listTaskByIdPath, listTasksByUserIdPath, updateTaskPath } = require('./task')

module.exports = {
  authPath,
  mePath,
  addAccountPath,
  addTaskPath,
  listTaskByIdPath,
  listTasksByUserIdPath,
  updateTaskPath
}