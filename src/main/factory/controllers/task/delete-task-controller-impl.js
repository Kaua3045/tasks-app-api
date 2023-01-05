const DeleteTaskController = require('../../../../presentation/controllers/task/delete-task-controller')
const DeleteTaskUseCase = require('../../../../domain/usecases/task/delete-task-usecase')

const LoadTaskByIdDbRepository = require('../../../../infra/repositories/task/load-task-by-id-db-repository')
const DeleteTaskDbRepository = require('../../../../infra/repositories/task/delete-task-db-repository')

const makeDeleteTaskController = () => {
  const loadTaskByIdDbRepository = new LoadTaskByIdDbRepository()
  const deleteTaskDbRepository = new DeleteTaskDbRepository()

  const deleteTaskUseCase = new DeleteTaskUseCase({
    loadTaskByIdRepository: loadTaskByIdDbRepository,
    deleteTaskRepository: deleteTaskDbRepository
  })

  return new DeleteTaskController({
    deleteTaskUseCase
  })
}

module.exports = {
  makeDeleteTaskController
}