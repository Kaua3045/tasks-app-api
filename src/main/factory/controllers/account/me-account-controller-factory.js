const MeAccountController = require("../../../../presentation/controllers/account/me-account-controller")
const MeAccountUseCase = require('../../../../domain/usecases/account/me-account-usecase')

const { makeAccountDbRepository } = require('../../repositories/account/account-db-repository-factory')

const { makeTokenGenerator } = require('../../utils')

const makeMeAccountController = () => {
  const meAccountUseCase = new MeAccountUseCase({
    loadAccountByIdRepository: makeAccountDbRepository(),
    tokenGenerator: makeTokenGenerator()
  })

  return new MeAccountController({
    meAccountUseCase
  })
}

module.exports = {
  makeMeAccountController
}