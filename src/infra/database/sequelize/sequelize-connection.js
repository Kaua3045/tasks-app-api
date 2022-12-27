const Sequelize = require('sequelize')
const databaseConfig = require('./config/databaseConfig')

const AccountDbModel = require('./models/account-database-model')
const TaskDbModel = require('./models/task-database-model')

const connection = new Sequelize(databaseConfig)

AccountDbModel.init(connection)
TaskDbModel.init(connection)

TaskDbModel.associate(connection.models)

// TaskDbModel.create({
//   id: '2950e933-5162-4e30-b692-ea2f336f833f',
//   title: 'tarefa 1',
//   description: 'tarefa 1 desc',
//   user_id: 'd2cb1657-82d4-4619-b6e7-8748428760a2'
// })

module.exports = connection