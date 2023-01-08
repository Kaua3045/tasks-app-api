const AuthenticateController = require('../../../../presentation/controllers/account/authenticate-controller')
const AuthenticateUseCase = require('../../../../domain/usecases/account/authenticate-usecase')

const { makeAccountDbRepository } = require('../../repositories/account/account-db-repository-factory')

const {
  makeEmailValidator,
  makeEncrypter,
  makeTokenGenerator
} = require('../../utils')

const makeAuthenticateController = () => {
  const authenticateUseCase = new AuthenticateUseCase({
    loadAccountByEmailRepository: makeAccountDbRepository(),
    encrypter: makeEncrypter(),
    tokenGenerator: makeTokenGenerator()
  })

  return new AuthenticateController({
    authenticateUseCase,
    emailValidator: makeEmailValidator()
  })
}

module.exports = {
  makeAuthenticateController
}