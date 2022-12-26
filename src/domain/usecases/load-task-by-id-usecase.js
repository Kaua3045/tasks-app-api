const { MissingParamError } = require('../../utils/errors')
const { TaskNotFoundError } = require('../errors')

module.exports = class LoadTaskByIdUseCase {
  constructor({ loadTaskByIdRepository } = {}) {
    this.loadTaskByIdRepository = loadTaskByIdRepository
  }

  async load(id) {
    if (!id) {
      throw new MissingParamError('id')
    }

    const task = await this.loadTaskByIdRepository.loadTask(id)

    if (!task) {
      throw new TaskNotFoundError()
    }

    return {
      task
    }
  }
}