const LoadTaskByIdController = require("../../../../presentation/controllers/task/load-task-by-id-controller")
const LoadTaskByIdUseCase = require('../../../../domain/usecases/task/load-task-by-id-usecase')

const { makeTaskDbRepository } = require('../../repositories/task/task-db-repository-factory')

const makeLoadTaskByIdController = () => {
  const loadTaskByIdUseCase = new LoadTaskByIdUseCase({
    loadTaskByIdRepository: makeTaskDbRepository()
  })

  return new LoadTaskByIdController({
    loadTaskByIdUseCase
  })
}

module.exports = { 
  makeLoadTaskByIdController 
}