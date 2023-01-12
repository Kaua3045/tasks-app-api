const AddAccountUseCase = require("../../../../domain/usecases/account/add-account-usecase")
const AddAccountController = require("../../../../presentation/controllers/account/add-account-controller")

const { makeAccountDbRepository } = require('../../repositories/account/account-db-repository-factory')

const { 
  makeTokenGenerator, 
  makeEncrypter, 
  makeEmailValidator, 
} = require("../../utils")

const makeAddAccountController = () => {
  const addAccountUseCase = new AddAccountUseCase({
    addAccountRepository: makeAccountDbRepository(),
    loadUserByEmailRepository: makeAccountDbRepository(),
    encrypter: makeEncrypter()
  })

  return new AddAccountController({
    addAccountUseCase,
    emailValidator: makeEmailValidator(),
    tokenGenerator: makeTokenGenerator()
  })
}

module.exports = { makeAddAccountController }