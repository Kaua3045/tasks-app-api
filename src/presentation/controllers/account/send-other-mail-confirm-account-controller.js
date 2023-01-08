const { AccountHasBeenConfirmedError } = require('../../errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class SendOtherMailConfirmAccountController {
  constructor({ sendMailConfirmAccountUseCase, meAccountUseCase } = {}) {
    this.sendMailConfirmAccountUseCase = sendMailConfirmAccountUseCase
    this.meAccountUseCase = meAccountUseCase
  }

  async handle(httpRequest) {
    try {
      const bearerToken = httpRequest.headers
      const token = bearerToken.authorization.split(' ')[1]

      if (!token) {
        return HttpResponse.accessDenidedError()
      }

      const account = await this.meAccountUseCase.meAccount(token)

      if (!account) {
        return HttpResponse.badRequest(new UserNotFoundError())
      }

      if (account.confirm === true) {
        return HttpResponse.badRequest(new AccountHasBeenConfirmedError())
      }

      this.sendMailConfirmAccountUseCase
        .sendMailConfirm(
          account.email, 
          account.name,
          account.id
        )

      return HttpResponse.noContent()
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}