const TaskDbModel = require("../../database/sequelize/models/task-database-model")

module.exports = class DeleteTaskDbRepository {
  async remove(id) {
    await TaskDbModel.destroy({ where: { id }})
  }
}