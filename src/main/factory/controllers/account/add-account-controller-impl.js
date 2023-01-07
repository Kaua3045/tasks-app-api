const AddAccountUseCase = require("../../../../domain/usecases/account/add-account-usecase")
const SendMailConfirmAccountUseCase = require("../../../../domain/usecases/account/send-mail-confirm-account-usecase")
const AddAccountDbRepository = require("../../../../infra/repositories/account/add-account-db-repository")
const LoadAccountByEmailDbRepository = require("../../../../infra/repositories/account/load-account-by-email-db-repository")
const AddAccountController = require("../../../../presentation/controllers/account/add-account-controller")
const EmailValidator = require("../../../../utils/helpers/email-validator")
const Encrypter = require("../../../../utils/helpers/encrypter")
const MailSend = require("../../../../utils/helpers/mail-send")
const TokenGenerator = require("../../../../utils/helpers/token-generator")

const makeAddAccountController = () => {
  const addAccountDbRepository = new AddAccountDbRepository()
  const loadAccountByEmailRepository = new LoadAccountByEmailDbRepository(true)

  const encrypter = new Encrypter()
  const emailValidator = new EmailValidator()
  const tokenGenerator = new TokenGenerator(process.env.JWT_SECRET, '60m')
  const mail = new MailSend()

  const sendMailConfirmAccountUseCase = new SendMailConfirmAccountUseCase({
    mailSend: mail,
    tokenGenerator
  })

  const addAccountUseCase = new AddAccountUseCase({
    addAccountRepository: addAccountDbRepository,
    loadUserByEmailRepository: loadAccountByEmailRepository,
    encrypter
  })

  return new AddAccountController({
    addAccountUseCase,
    emailValidator,
    tokenGenerator,
    sendMailConfirmAccountUseCase
  })
}

module.exports = { makeAddAccountController }