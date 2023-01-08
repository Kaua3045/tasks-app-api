const AddTaskUseCase = require("../../../../domain/usecases/task/add-task-usecase")
const AddTaskController = require("../../../../presentation/controllers/task/add-task-controller")

const { makeTaskDbRepository } = require('../../repositories/task/task-db-repository-factory')

const makeAddTaskController = () => {
  const addTaskUseCase = new AddTaskUseCase({
    addTaskRepository: makeTaskDbRepository()
  })

  return new AddTaskController({
    addTaskUseCase
  })
}

module.exports = {
  makeAddTaskController
}