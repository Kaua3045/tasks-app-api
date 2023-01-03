const HttpResponse = require('../../helpers/http-response')
const { UserNotFoundError } = require('../../../domain/errors')

module.exports = class MeAccountController {
  constructor({ meAccountUseCase } = {}) {
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

      return HttpResponse.ok({ account })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}