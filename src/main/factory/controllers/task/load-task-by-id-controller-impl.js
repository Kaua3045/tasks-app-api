const LoadTaskByIdController = require("../../../../presentation/controllers/task/load-task-by-id-controller")
const LoadTaskByIdUseCase = require('../../../../domain/usecases/task/load-task-by-id-usecase')
const LoadTaskByIdDbRepository = require("../../../../infra/repositories/task/load-task-by-id-db-repository")

const makeLoadTaskByIdController = () => {
  const loadTaskByIdDbRepository = new LoadTaskByIdDbRepository()

  const loadTaskByIdUseCase = new LoadTaskByIdUseCase({
    loadTaskByIdRepository: loadTaskByIdDbRepository
  })

  return new LoadTaskByIdController({
    loadTaskByIdUseCase
  })
}

module.exports = { 
  makeLoadTaskByIdController 
}