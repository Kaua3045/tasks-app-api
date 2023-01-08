const DeleteTaskController = require('../../../../presentation/controllers/task/delete-task-controller')
const DeleteTaskUseCase = require('../../../../domain/usecases/task/delete-task-usecase')

const { makeTaskDbRepository } = require('../../repositories/task/task-db-repository-factory')

const makeDeleteTaskController = () => {
  const deleteTaskUseCase = new DeleteTaskUseCase({
    loadTaskByIdRepository: makeTaskDbRepository(),
    deleteTaskRepository: makeTaskDbRepository()
  })

  return new DeleteTaskController({
    deleteTaskUseCase
  })
}

module.exports = {
  makeDeleteTaskController
}