const { MissingParamError } = require("../../utils/errors")

module.exports = class AddTasksUseCase {
  constructor({ addTaskRepository } = {}) {
    this.addTaskRepository = addTaskRepository
  }

  async addTask({ title, description, user_id }) {
    if (!title) {
      throw new MissingParamError('title')
    }
    if(!description) {
      throw new MissingParamError('description')
    }
    if(!user_id) {
      throw new MissingParamError('user_id')
    }

    const taskCreated = await this.addTaskRepository.saveTask(title, description, user_id)
    return {
      taskCreated
    }
  }
}