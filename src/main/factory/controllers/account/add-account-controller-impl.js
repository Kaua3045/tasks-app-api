const AddAccountUseCase = require("../../../../domain/usecases/account/add-account-usecase")
const SendMailConfirmAccountUseCase = require("../../../../domain/usecases/account/send-mail-confirm-account-usecase")
const AddAccountDbRepository = require("../../../../infra/repositories/account/add-account-db-repository")
const LoadAccountByEmailDbRepository = require("../../../../infra/repositories/account/load-account-by-email-db-repository")
const AddAccountController = require("../../../../presentation/controllers/account/add-account-controller")

const { 
  makeTokenGenerator, 
  makeEncrypter, 
  makeEmailValidator, 
  makeMailSend 
} = require("../../utils")

const makeAddAccountController = () => {
  const addAccountDbRepository = new AddAccountDbRepository()
  const loadAccountByEmailRepository = new LoadAccountByEmailDbRepository(true)

  const sendMailConfirmAccountUseCase = new SendMailConfirmAccountUseCase({
    mailSend: makeMailSend(),
    tokenGenerator: makeTokenGenerator()
  })

  const addAccountUseCase = new AddAccountUseCase({
    addAccountRepository: addAccountDbRepository,
    loadUserByEmailRepository: loadAccountByEmailRepository,
    encrypter: makeEncrypter()
  })

  return new AddAccountController({
    addAccountUseCase,
    emailValidator: makeEmailValidator(),
    tokenGenerator: makeTokenGenerator(),
    sendMailConfirmAccountUseCase
  })
}

module.exports = { makeAddAccountController }