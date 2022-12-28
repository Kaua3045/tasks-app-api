const express = require('express')
const taskRouter = express.Router()

const { adapt } = require('../adapters/express-router-adapter')

const { makeAddTaskController } = require('../factory/controllers/add-task-controller-impl')

taskRouter.post('/create', adapt(makeAddTaskController()))

module.exports = taskRouter