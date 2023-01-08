const TaskModel = require('../../models/task-model')
const TaskDbModel = require('../../database/sequelize/models/task-database-model')

module.exports = class TaskDbRepository {
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

  async loadTask(id) {
    const task = await TaskDbModel.findOne({ where: { id }})
    return task
  }

  async loadAllTask(user_id) {
    const tasks = await TaskDbModel.findAll({ where: { user_id: user_id }})

    return tasks
  }

  async update(id, title, description, completed) {
    const task = await TaskDbModel.update({ title, description, completed }, { where: { id }, plain: true, returning: true })
    return task[1]
  }

  async remove(id) {
    await TaskDbModel.destroy({ where: { id }})
  }
}