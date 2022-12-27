const Sequelize = require('sequelize')
const databaseConfig = require('./config/databaseConfig')

const AccountDbModel = require('./models/account-database-model')

const connection = new Sequelize(databaseConfig)
AccountDbModel.init(connection)

module.exports = connection