module.exports = class DeleteTaskUseCase {

  constructor({ loadTaskByIdRepository, deleteTaskRepository } = {}) {
    this.loadTaskByIdRepository = loadTaskByIdRepository
    this.deleteTaskRepository = deleteTaskRepository
  }

  async delete(id) {
    const task = await this.loadTaskByIdRepository.loadTask(id)

    if (!task) {
      return null
    }

    await this.deleteTaskRepository.remove(id)
  }
}