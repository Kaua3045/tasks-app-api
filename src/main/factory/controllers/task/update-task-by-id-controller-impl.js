const UpdateTaskByIdController = require("../../../../presentation/controllers/task/update-task-by-id-controller")
const UpdateTaskUseCase = require('../../../../domain/usecases/task/update-task-usecase')
const LoadTaskByIdDbRepository = require('../../../../infra/repositories/task/load-task-by-id-db-repository')
const UpdateTaskByIdDbRepository = require('../../../../infra/repositories/task/update-task-by-id-db-repository')

const makeUpdateTaskByIdController = () => {
  const loadTaskByIdDbRepository = new LoadTaskByIdDbRepository()
  const updateTaskByIdDbRepository = new UpdateTaskByIdDbRepository()

  const updateTaskUseCase = new UpdateTaskUseCase({
    loadTaskByIdRepository: loadTaskByIdDbRepository,
    updateTaskByIdRepository: updateTaskByIdDbRepository
  })

  return new UpdateTaskByIdController({
    updateTaskUseCase
  })
}

module.exports = {
  makeUpdateTaskByIdController
}