const TaskDbModel = require("../../database/sequelize/models/task-database-model")

module.exports = class LoadTasksByUserIdDbRepository { 
  async loadAllTask(user_id) {
    const tasks = await TaskDbModel.findAll({ where: { user_id: user_id }})

    return tasks
  }
}