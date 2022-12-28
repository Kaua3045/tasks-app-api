module.exports = class LoadTaskByIdUseCase {
  constructor({ loadTaskByIdRepository } = {}) {
    this.loadTaskByIdRepository = loadTaskByIdRepository
  }

  async load(id) {
    const task = await this.loadTaskByIdRepository.loadTask(id)

    if (!task) {
      return null
    }

    return {
      task
    }
  }
}