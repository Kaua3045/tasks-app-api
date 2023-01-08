const SendMailConfirmAccountUseCase = require('../../../domain/usecases/account/send-mail-confirm-account-usecase')
const { makeMailSend, makeTokenGenerator } = require('../../../main/factory/utils')

module.exports = {
  key: 'MailConfirmAccount',
  async sendMail({ data }) {
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

    // await mailSend.send(account.email, 'Confirm Account', 'confirm-account-template', {
    //   name: account.name,
    //   url: `http://localhost:8000/api/account/confirm/${token}`
    // })
  }
}