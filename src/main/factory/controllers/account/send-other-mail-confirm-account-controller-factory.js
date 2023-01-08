const SendOtherMailConfirmAccountController = require("../../../../presentation/controllers/account/send-other-mail-confirm-account-controller")
const MeAccountUseCase = require('../../../../domain/usecases/account/me-account-usecase')

const { makeAccountDbRepository } = require('../../repositories/account/account-db-repository-factory')

const {
  makeTokenGenerator
} = require('../../utils')

const queue = require('../../../../infra/queue/bull-queue')

const makeSendOtherMailConfirmAccountController = () => {
  const meAccountUseCase = new MeAccountUseCase({
    loadAccountByIdRepository: makeAccountDbRepository(),
    tokenGenerator: makeTokenGenerator()
  })

  return new SendOtherMailConfirmAccountController({
    queue,
    meAccountUseCase
  })
}

module.exports = {
  makeSendOtherMailConfirmAccountController
}