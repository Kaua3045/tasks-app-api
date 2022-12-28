const express = require('express')
const taskRouter = express.Router()

const { adapt } = require('../adapters/express-router-adapter')

const { makeAddTaskController } = require('../factory/controllers/add-task-controller-impl')
const { makeLoadTaskByIdController } = require('../factory/controllers/load-task-by-id-controller-impl')

taskRouter.post('/create', adapt(makeAddTaskController()))
taskRouter.get('/:id', adapt(makeLoadTaskByIdController()))

module.exports = taskRouter