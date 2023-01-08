const { 
  authPath, 
  mePath, 
  addAccountPath, 
  confirmAccountPath, 
  resendAccountConfirmPath 
} = require('./account')

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
  resendAccountConfirmPath,
  addTaskPath,
  listTaskByIdPath,
  listTasksByUserIdPath,
  updateTaskPath,
  deleteTaskPath
}