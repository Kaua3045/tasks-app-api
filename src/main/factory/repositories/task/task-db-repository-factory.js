const TaskDbRepository = require("../../../../infra/repositories/task/task-db-repository")

const makeTaskDbRepository = () => {
  const taskDbRepository = new TaskDbRepository()
  return taskDbRepository
}

module.exports = {
  makeTaskDbRepository
}