const SendOtherMailConfirmAccountController = require("../../../../presentation/controllers/account/send-other-mail-confirm-account-controller")
const SendMailConfirmAccountUseCase = require("../../../../domain/usecases/account/send-mail-confirm-account-usecase")
const MeAccountUseCase = require('../../../../domain/usecases/account/me-account-usecase')

const { makeAccountDbRepository } = require('../../repositories/account/account-db-repository-factory')

const {
  makeMailSend,
  makeTokenGenerator
} = require('../../utils')

const makeSendOtherMailConfirmAccountController = () => {
  const sendMailConfirmAccountUseCase = new SendMailConfirmAccountUseCase({
    mailSend: makeMailSend(),
    tokenGenerator: makeTokenGenerator()
  })

  const meAccountUseCase = new MeAccountUseCase({
    loadAccountByIdRepository: makeAccountDbRepository(),
    tokenGenerator: makeTokenGenerator()
  })

  return new SendOtherMailConfirmAccountController({
    sendMailConfirmAccountUseCase,
    meAccountUseCase
  })
}

module.exports = {
  makeSendOtherMailConfirmAccountController
}