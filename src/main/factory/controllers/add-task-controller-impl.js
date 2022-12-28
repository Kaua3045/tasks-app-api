const AddTaskUseCase = require("../../../domain/usecases/add-task-usecase")
const AddTaskDbRepository = require("../../../infra/repositories/add-task-db-repository")
const AddTaskController = require("../../../presentation/controllers/add-task-controller")

const makeAddTaskController = () => {
  const addTaskDbRepository = new AddTaskDbRepository()

  const addTaskUseCase = new AddTaskUseCase({
    addTaskRepository: addTaskDbRepository
  })

  return new AddTaskController({
    addTaskUseCase
  })
}

module.exports = {
  makeAddTaskController
}