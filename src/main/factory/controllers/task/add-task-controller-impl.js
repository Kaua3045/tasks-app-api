const AddTaskUseCase = require("../../../../domain/usecases/task/add-task-usecase")
const AddTaskDbRepository = require("../../../../infra/repositories/task/add-task-db-repository")
const AddTaskController = require("../../../../presentation/controllers/task/add-task-controller")

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