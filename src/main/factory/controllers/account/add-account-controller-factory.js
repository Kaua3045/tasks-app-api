const AddAccountUseCase = require("../../../../domain/usecases/account/add-account-usecase")
const SendMailConfirmAccountUseCase = require("../../../../domain/usecases/account/send-mail-confirm-account-usecase")
const AddAccountController = require("../../../../presentation/controllers/account/add-account-controller")

const { makeAccountDbRepository } = require('../../repositories/account/account-db-repository-factory')

const { 
  makeTokenGenerator, 
  makeEncrypter, 
  makeEmailValidator, 
  makeMailSend 
} = require("../../utils")

const mailQueue = require('../../../../infra/queue/bull-queue')

const makeAddAccountController = () => {
  const addAccountUseCase = new AddAccountUseCase({
    addAccountRepository: makeAccountDbRepository(),
    loadUserByEmailRepository: makeAccountDbRepository(),
    encrypter: makeEncrypter()
  })

  return new AddAccountController({
    addAccountUseCase,
    emailValidator: makeEmailValidator(),
    tokenGenerator: makeTokenGenerator(),
    queue: mailQueue
  })
}

module.exports = { makeAddAccountController }