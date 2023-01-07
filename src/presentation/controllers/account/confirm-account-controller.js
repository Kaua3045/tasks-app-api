const { UserNotFoundError } = require("../../../domain/errors")
const { MissingParamError } = require("../../../utils/errors")
const HttpResponse = require("../../helpers/http-response")

module.exports = class ConfirmAccountController {
  constructor({ confirmAccountUseCase } = {}) {
    this.confirmAccountUseCase = confirmAccountUseCase
  }

  async handle(httpRequest) {
    try {
      const { token } = httpRequest.params

      if (!token) {
        return HttpResponse.badRequest(new MissingParamError('token'))
      }

      const account = await this.confirmAccountUseCase.confirm(token)

      if (account === null) {
        return HttpResponse.badRequest(new UserNotFoundError())
      }

      return HttpResponse.ok({ account })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}