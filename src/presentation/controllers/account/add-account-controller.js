const HttpResponse = require('../../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../../../utils/errors')
const { UserAlreadyExistsError } = require('../../../domain/errors')

module.exports = class AddAccountController {
  constructor({ addAccountUseCase, emailValidator } = {}) {
    this.addAccountUseCase = addAccountUseCase
    this.emailValidator = emailValidator
  }

  async handle(httpRequest) {
    try {
      const { name, email, password } = httpRequest.body
      if (!name) {
        return HttpResponse.badRequest(new MissingParamError('name'))
      }
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }

      const account = await this.addAccountUseCase.addAccount({ name, email, password })

      if (!account) {
        return HttpResponse.badRequest(new UserAlreadyExistsError())
      }

      return HttpResponse.ok({ account: account.userCreated })
    } catch(error) {
      return HttpResponse.serverError()
    }
  }
}