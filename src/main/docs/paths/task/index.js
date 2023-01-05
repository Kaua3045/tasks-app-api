const addTaskPath = require('./add-task-path')
const listTaskByIdPath = require('./list-task-by-id-path')
const listTasksByUserIdPath = require('./list-tasks-by-user-id-path')
const updateTaskPath = require('./update-task-path')
const deleteTaskPath = require('./delete-task-path')

module.exports = {
  addTaskPath,
  listTaskByIdPath,
  listTasksByUserIdPath,
  updateTaskPath,
  deleteTaskPath
}