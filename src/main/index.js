const express = require('express')
const app = express()

app.use(express.json())

require('../infra/database/sequelize/sequelize-connection')

const { adapt } = require('./adapters/express-router-adapter')

const AddAccountDbRepository = require('../infra/repositories/add-account-db-repository')
const LoadAccountByEmailRepository = require('../infra/repositories/load-account-by-email-db-repository')
const AddAccountUseCase = require('../domain/usecases/add-account-usecase')
const AddAccountController = require('../presentation/controllers/add-account-controller')

const EmailValidator = require('../utils/helpers/email-validator')
const Encrypter = require('../utils/helpers/encrypter')

const encrypter = new Encrypter()

const addAccountDbRepository = new AddAccountDbRepository()
const loadAccountByEmailRepository = new LoadAccountByEmailRepository()
const addAccountUseCase = new AddAccountUseCase({
  addAccountRepository: addAccountDbRepository,
  loadUserByEmailRepository: loadAccountByEmailRepository,
  encrypter
})

const emailValidator = new EmailValidator()
const addAccountController = new AddAccountController({
  addAccountUseCase,
  emailValidator
})

app.post('/', adapt(addAccountController))

app.listen(3000, () => console.log('Server running'))