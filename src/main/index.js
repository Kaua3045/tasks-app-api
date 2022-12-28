const express = require('express')
const app = express()

app.use(express.json())

require('../infra/database/sequelize/sequelize-connection')

app.use('/api', require('./routes/routes'))

const AddTaskController = require('../presentation/controllers/add-task-controller')

const AddTaskUseCase = require('../domain/usecases/add-task-usecase')
const AddTaskRepository = require('../infra/repositories/add-task-db-repository')

const addTaskRepository = new AddTaskRepository()
const addTaskUseCase = new AddTaskUseCase({ addTaskRepository })
const addTaskController = new AddTaskController({ addTaskUseCase })

app.listen(3000, () => console.log('Server running'))