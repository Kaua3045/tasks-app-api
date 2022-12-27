const TaskModel = require('../models/task-model')
const TaskDbModel = require('../database/sequelize/models/task-database-model')

module.exports = class AddTaskDbRepository {
  async saveTask(title, description, user_id) {
    const task = new TaskModel(title, description, user_id, false)
    const taskCreated = await TaskDbModel.create({
      id: task.id,
      title: task.title,
      description: task.description,
      user_id: task.user_id
    })

    return taskCreated
  }
}