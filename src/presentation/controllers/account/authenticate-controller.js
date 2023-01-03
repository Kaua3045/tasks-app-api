const { MissingParamError, InvalidParamError } = require("../../../utils/errors")
const HttpResponse = require("../../helpers/http-response")

module.exports = class AuthenticateController {
  constructor({ authenticateUseCase, emailValidator } = {}) {
    this.authenticateUseCase = authenticateUseCase
    this.emailValidator = emailValidator
  }

  async handle(httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }

      const token = await this.authenticateUseCase.auth({ email, password })
      if (!token) {
        return HttpResponse.unauthorizedError()
      }

      return HttpResponse.ok({ token: token.accessToken })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}