const HttpResponse = require('../helpers/http-response')
const { MissingParamError } = require('../../utils/errors')
const { MissingHeaderError, JwtTokenError } = require('../errors')

module.exports = class AuthMiddleware {
  constructor({ tokenGenerator } = {}) {
    this.tokenGenerator = tokenGenerator
  }

  async handle(httpRequest) {
    try {
      const token = httpRequest.headers.authorization

      if (!token) {
        return HttpResponse.badRequest(new MissingHeaderError('authorization'))
      }

      const [, accessToken] = token.split(' ')

      if (!accessToken) {
        return HttpResponse.badRequest(new MissingParamError('accessToken'))
      }

      const verifyToken = await this.tokenGenerator.verify(accessToken)

      if (!verifyToken) {
        return HttpResponse.accessDenidedError()
      }

      return HttpResponse.ok({ verifyToken })
    } catch (error) {
      return HttpResponse.badRequest(new JwtTokenError())
    }
  }
}