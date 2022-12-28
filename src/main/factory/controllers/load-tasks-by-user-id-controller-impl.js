const LoadTasksByUserIdUseCase = require('../../../domain/usecases/load-tasks-by-user-id-usecase')
const LoadTasksByUserIdDbRepository = require('../../../infra/repositories/load-tasks-by-user-id-db-repository')
const LoadTasksByUserIdController = require("../../../presentation/controllers/load-tasks-by-user-id-controller")

const makeLoadTasksByUserIdController = () => {
  const loadTasksByUserIdDbRepository = new LoadTasksByUserIdDbRepository()
  const loadTasksByUserIdUseCase = new LoadTasksByUserIdUseCase({
    loadTasksByUserIdRepository: loadTasksByUserIdDbRepository
  })

  return new LoadTasksByUserIdController({
    loadTasksByUserIdUseCase
  })
}

module.exports = { makeLoadTasksByUserIdController }