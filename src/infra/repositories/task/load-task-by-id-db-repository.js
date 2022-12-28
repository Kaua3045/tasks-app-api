const TaskDbModel = require('../../database/sequelize/models/task-database-model')

module.exports = class LoadTaskByIdDbRepository {
  async loadTask(id) {
    const task = await TaskDbModel.findOne({ where: { id }})
    return task
  }
}