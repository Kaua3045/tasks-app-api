module.exports = class AddTaskUseCase {
  constructor({ addTaskRepository } = {}) {
    this.addTaskRepository = addTaskRepository
  }

  async addTask({ title, description, user_id }) {
    const taskCreated = await this.addTaskRepository.saveTask(title, description, user_id)
    return {
      taskCreated
    }
  }
}