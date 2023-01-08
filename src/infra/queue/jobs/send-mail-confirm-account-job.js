const SendMailConfirmAccountUseCase = require('../../../domain/usecases/account/send-mail-confirm-account-usecase')
const { makeMailSend, makeTokenGenerator } = require('../../../main/factory/utils')

module.exports = {
  key: 'MailConfirmAccount',
  async handle({ data }) {
    const { account } = data
    
    const sendMailConfirmAccountUseCase = new SendMailConfirmAccountUseCase({
      mailSend: makeMailSend(),
      tokenGenerator: makeTokenGenerator()
    })

    await sendMailConfirmAccountUseCase.sendMailConfirm(
      account.email, 
      account.name,
      account.id
    )
  }
}