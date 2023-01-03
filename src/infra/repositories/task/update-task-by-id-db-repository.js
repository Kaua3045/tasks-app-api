const TaskDbModel = require("../../database/sequelize/models/task-database-model")

module.exports = class UpdateTaskByIdDbRepository {
  async update(id, title, description, completed) {
    const task = await TaskDbModel.update({ title, description, completed }, { where: { id }, plain: true, returning: true })
    return task[1]
  }
}