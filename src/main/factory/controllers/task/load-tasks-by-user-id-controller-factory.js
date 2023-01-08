const LoadTasksByUserIdUseCase = require('../../../../domain/usecases/task/load-tasks-by-user-id-usecase')
const LoadTasksByUserIdController = require("../../../../presentation/controllers/task/load-tasks-by-user-id-controller")

const { makeTaskDbRepository } = require('../../repositories/task/task-db-repository-factory')

const makeLoadTasksByUserIdController = () => {
  const loadTasksByUserIdUseCase = new LoadTasksByUserIdUseCase({
    loadTasksByUserIdRepository: makeTaskDbRepository()
  })

  return new LoadTasksByUserIdController({
    loadTasksByUserIdUseCase
  })
}

module.exports = { makeLoadTasksByUserIdController }