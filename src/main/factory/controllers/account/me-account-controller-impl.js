const MeAccountController = require("../../../../presentation/controllers/account/me-account-controller")
const MeAccountUseCase = require('../../../../domain/usecases/account/me-account-usecase')

const LoadAccountByIdDbRepository = require('../../../../infra/repositories/account/load-account-by-id-db-repository')
const TokenGenerator = require('../../../../utils/helpers/token-generator')

const makeMeAccountController = () => {
  const loadAccountByIdDbRepository = new LoadAccountByIdDbRepository()
  const tokenGenerator = new TokenGenerator(process.env.JWT_SECRET, '60min')

  const meAccountUseCase = new MeAccountUseCase({
    loadAccountByIdRepository: loadAccountByIdDbRepository,
    tokenGenerator
  })

  return new MeAccountController({
    meAccountUseCase
  })
}

module.exports = {
  makeMeAccountController
}