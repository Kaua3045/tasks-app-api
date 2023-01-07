module.exports = class SendMailConfirmAccountUseCase {
  constructor({ mailSend, tokenGenerator } = {}) {
    this.mailSend = mailSend
    this.tokenGenerator = tokenGenerator
  }

  async sendMailConfirm(email, name, id) {
    const token = await this.tokenGenerator.generateAccessToken(id)

    this.mailSend.send(email, 'Confirm Account', 'confirm-account-template', {
      name,
      url: `http://localhost:8000/api/account/confirm/${token}`
    })
  }
}