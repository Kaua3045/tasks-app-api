const { authPath, mePath, addAccountPath, confirmAccountPath } = require('./account')
const { 
  addTaskPath, 
  listTaskByIdPath, 
  listTasksByUserIdPath, 
  updateTaskPath,
  deleteTaskPath
} = require('./task')

module.exports = {
  authPath,
  mePath,
  addAccountPath,
  confirmAccountPath,
  addTaskPath,
  listTaskByIdPath,
  listTasksByUserIdPath,
  updateTaskPath,
  deleteTaskPath
}