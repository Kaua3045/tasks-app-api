const Sequelize = require('sequelize')
const AddAccountDbRepository = require('../../repositories/add-account-db-repository')
const databaseConfig = require('./config/databaseConfig')

const AccountDbModel = require('./models/account-database-model')

const connection = new Sequelize(databaseConfig)
AccountDbModel.init(connection)

// AccountDbModel.create({
//   id: 'a817cf15-765b-487a-a25d-edbf9e022904',
//   name: 'a',
//   email: 'a@hotmail.com',
//   password: 'ab'
// })

module.exports = connection