const AddAccountUseCase = require("../../../../domain/usecases/account/add-account-usecase")
const AddAccountDbRepository = require("../../../../infra/repositories/account/add-account-db-repository")
const LoadAccountByEmailDbRepository = require("../../../../infra/repositories/account/load-account-by-email-db-repository")
const AddAccountController = require("../../../../presentation/controllers/account/add-account-controller")
const EmailValidator = require("../../../../utils/helpers/email-validator")
const Encrypter = require("../../../../utils/helpers/encrypter")

const makeAddAccountController = () => {
  const addAccountDbRepository = new AddAccountDbRepository()
  const loadAccountByEmailRepository = new LoadAccountByEmailDbRepository()

  const encrypter = new Encrypter()
  const emailValidator = new EmailValidator()

  const addAccountUseCase = new AddAccountUseCase({
    addAccountRepository: addAccountDbRepository,
    loadUserByEmailRepository: loadAccountByEmailRepository,
    encrypter
  })

  return new AddAccountController({
    addAccountUseCase,
    emailValidator
  })
}

module.exports = { makeAddAccountController }