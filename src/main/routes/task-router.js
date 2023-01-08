const express = require('express')
const taskRouter = express.Router()

const { adapt } = require('../adapters/express-router-adapter')

const auth = require('../middlewares/auth')

const { makeAddTaskController } = require('../factory/controllers/task/add-task-controller-factory')
const { makeLoadTaskByIdController } = require('../factory/controllers/task/load-task-by-id-controller-factory')
const { makeLoadTasksByUserIdController } = require('../factory/controllers/task/load-tasks-by-user-id-controller-factory')
const { makeUpdateTaskByIdController } = require('../factory/controllers/task/update-task-by-id-controller-factory')
const { makeDeleteTaskController } = require('../factory/controllers/task/delete-task-controller-factory')

taskRouter.get('/:id', auth, adapt(makeLoadTaskByIdController()))
taskRouter.get('/all/:userId', auth, adapt(makeLoadTasksByUserIdController()))
taskRouter.post('/create', auth, adapt(makeAddTaskController()))
taskRouter.patch('/update/:id', auth, adapt(makeUpdateTaskByIdController()))
taskRouter.delete('/delete/:id', auth, adapt(makeDeleteTaskController()));

module.exports = taskRouter