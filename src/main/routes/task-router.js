const express = require('express')
const taskRouter = express.Router()

const { adapt } = require('../adapters/express-router-adapter')

const { makeAddTaskController } = require('../factory/controllers/add-task-controller-impl')
const { makeLoadTaskByIdController } = require('../factory/controllers/load-task-by-id-controller-impl')
const { makeLoadTasksByUserIdController } = require('../factory/controllers/load-tasks-by-user-id-controller-impl')

taskRouter.post('/create', adapt(makeAddTaskController()))
taskRouter.get('/:id', adapt(makeLoadTaskByIdController()))
taskRouter.get('/all/:userId', adapt(makeLoadTasksByUserIdController()))

module.exports = taskRouter