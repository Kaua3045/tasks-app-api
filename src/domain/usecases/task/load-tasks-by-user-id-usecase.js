module.exports = class LoadTasksByUserIdUseCase {
  constructor({ loadTasksByUserIdRepository } = {}) {
    this.loadTasksByUserIdRepository = loadTasksByUserIdRepository
  }

  async loadAll(userId) {
    const allTasks = await this.loadTasksByUserIdRepository.loadAllTask(userId)

    return allTasks
  }
}