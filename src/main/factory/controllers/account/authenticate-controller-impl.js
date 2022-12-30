const AuthenticateController = require('../../../../presentation/controllers/account/authenticate-controller')
const AuthenticateUseCase = require('../../../../domain/usecases/account/authenticate-usecase')
const LoadAccountByEmailDbRepository = require('../../../../infra/repositories/account/load-account-by-email-db-repository')

const EmailValidator = require('../../../../utils/helpers/email-validator')
const Encrypter = require('../../../../utils/helpers/encrypter')
const TokenGenerator = require('../../../../utils/helpers/token-generator')

const makeAuthenticateController = () => {
  const loadAccountByEmailDbRepository = new LoadAccountByEmailDbRepository()
  const encrypter = new Encrypter()
  const emailValidator = new EmailValidator()
  const tokenGenerator = new TokenGenerator(process.env.JWT_SECRET, '60m')

  const authenticateUseCase = new AuthenticateUseCase({
    loadAccountByEmailRepository: loadAccountByEmailDbRepository,
    encrypter,
    tokenGenerator
  })

  return new AuthenticateController({
    authenticateUseCase,
    emailValidator
  })
}

module.exports = {
  makeAuthenticateController
}