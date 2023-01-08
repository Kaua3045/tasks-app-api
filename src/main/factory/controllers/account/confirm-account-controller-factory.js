const ConfirmAccountUseCase = require("../../../../domain/usecases/account/confirm-account-usecase")
const ConfirmAccountController = require("../../../../presentation/controllers/account/confirm-account-controller")

const { makeAccountDbRepository } = require('../../repositories/account/account-db-repository-factory')

const { makeTokenGenerator } = require('../../utils')

const makeConfirmAccountController = () => {
  const confirmAccountUseCase = new ConfirmAccountUseCase({
    tokenGenerator: makeTokenGenerator(),
    loadAccountByIdRepository: makeAccountDbRepository(),
    confirmAccountRepository: makeAccountDbRepository()
  })

  return new ConfirmAccountController({
    confirmAccountUseCase
  })
}

module.exports = {
  makeConfirmAccountController
}