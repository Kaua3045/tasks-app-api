const Sequelize = require('sequelize')
const databaseConfig = require('./config/databaseConfig')

const connection = new Sequelize(databaseConfig)

module.exports = connection