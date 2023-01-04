const express = require('express')
const taskRouter = express.Router()

const { adapt } = require('../adapters/express-router-adapter')

const { makeAddTaskController } = require('../factory/controllers/task/add-task-controller-impl')
const { makeLoadTaskByIdController } = require('../factory/controllers/task/load-task-by-id-controller-impl')
const { makeLoadTasksByUserIdController } = require('../factory/controllers/task/load-tasks-by-user-id-controller-impl')
const { makeUpdateTaskByIdController } = require('../factory/controllers/task/update-task-by-id-controller-impl')

const auth = require('../middlewares/auth')

taskRouter.get('/:id', auth, adapt(makeLoadTaskByIdController()))
taskRouter.get('/all/:userId', auth, adapt(makeLoadTasksByUserIdController()))
taskRouter.post('/create', auth, adapt(makeAddTaskController()))
taskRouter.patch('/update/:id', auth, adapt(makeUpdateTaskByIdController()))

module.exports = taskRouter