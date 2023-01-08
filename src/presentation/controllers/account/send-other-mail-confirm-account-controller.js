const { AccountHasBeenConfirmedError } = require('../../errors')
const { UserNotFoundError } = require('../../../domain/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class SendOtherMailConfirmAccountController {
  constructor({ meAccountUseCase, queue } = {}) {
    this.meAccountUseCase = meAccountUseCase
    this.queue = queue
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

      await this.queue.add('MailConfirmAccount', { account })

      return HttpResponse.noContent()
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}