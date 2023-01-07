const ConfirmAccountUseCase = require("../../../../domain/usecases/account/confirm-account-usecase")
const ConfirmAccountController = require("../../../../presentation/controllers/account/confirm-account-controller")
const LoadAccountByIdDbRepository = require('../../../../infra/repositories/account/load-account-by-id-db-repository')
const ConfirmAccountDbRepository = require('../../../../infra/repositories/account/confirm-account-db-repository')

const TokenGenerator = require('../../../../utils/helpers/token-generator')

const makeConfirmAccountController = () => {
  const tokenGenerator = new TokenGenerator(process.env.JWT_SECRET, '60m')
  const loadAccountByIdDbRepository = new LoadAccountByIdDbRepository()
  const confirmAccountDbRepository = new ConfirmAccountDbRepository()

  const confirmAccountUseCase = new ConfirmAccountUseCase({
    tokenGenerator,
    loadAccountByIdRepository: loadAccountByIdDbRepository,
    confirmAccountRepository: confirmAccountDbRepository
  })

  return new ConfirmAccountController({
    confirmAccountUseCase
  })
}

module.exports = {
  makeConfirmAccountController
}