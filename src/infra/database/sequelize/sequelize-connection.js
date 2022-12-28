const Sequelize = require('sequelize')
const databaseConfig = require('./config/databaseConfig')

const AccountDbModel = require('./models/account-database-model')
const TaskDbModel = require('./models/task-database-model')

const connection = new Sequelize(databaseConfig)

AccountDbModel.init(connection)
TaskDbModel.init(connection)

TaskDbModel.associate(connection.models)

module.exports = connection