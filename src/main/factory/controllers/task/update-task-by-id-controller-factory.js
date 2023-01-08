const UpdateTaskByIdController = require("../../../../presentation/controllers/task/update-task-by-id-controller")
const UpdateTaskUseCase = require('../../../../domain/usecases/task/update-task-usecase')

const { makeTaskDbRepository } = require('../../repositories/task/task-db-repository-factory')

const makeUpdateTaskByIdController = () => {
  const updateTaskUseCase = new UpdateTaskUseCase({
    loadTaskByIdRepository: makeTaskDbRepository(),
    updateTaskByIdRepository: makeTaskDbRepository()
  })

  return new UpdateTaskByIdController({
    updateTaskUseCase
  })
}

module.exports = {
  makeUpdateTaskByIdController
}