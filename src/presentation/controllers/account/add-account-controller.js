const HttpResponse = require('../../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../../../utils/errors')
const { UserAlreadyExistsError } = require('../../../domain/errors')

module.exports = class AddAccountController {
  constructor({ addAccountUseCase, emailValidator, tokenGenerator, mailSend } = {}) {
    this.addAccountUseCase = addAccountUseCase
    this.emailValidator = emailValidator
    this.tokenGenerator = tokenGenerator
    this.mailSend = mailSend
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

      const token = await this.tokenGenerator.generateAccessToken(account.userCreated.id)
      this.mailSend.send(account.userCreated.email, 'Confirme Account', 'confirm-account-template', {
        name: account.userCreated.name,
        url: 'http://localhost:8000/api/account/confirm'
      })

      return HttpResponse.ok({ account: account.userCreated, token })
    } catch(error) {
      return HttpResponse.serverError()
    }
  }
}