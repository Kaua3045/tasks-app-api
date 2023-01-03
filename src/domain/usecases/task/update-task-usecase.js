module.exports = class UpdateTaskUseCase {
  constructor({ loadTaskByIdRepository, updateTaskByIdRepository } = {}) {
    this.loadTaskByIdRepository = loadTaskByIdRepository
    this.updateTaskByIdRepository = updateTaskByIdRepository
  }

  async updateTask(id, { title, description, completed }) {
    const taskLoad = await this.loadTaskByIdRepository.load(id)

    if (!taskLoad) {
      return null
    }

    const taskUpdated = {
      title: title || taskLoad.title,
      description: description || taskLoad.description,
      completed: completed || taskLoad.completed,
    }

    const task = await this.updateTaskByIdRepository.update(
        id,
        taskUpdated.title,
        taskUpdated.description,
        taskUpdated.completed
      )

    return task
  }
}