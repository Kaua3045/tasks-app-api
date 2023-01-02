const HttpResponse = require('../helpers/http-response')

module.exports = class AuthMiddleware {
  constructor({ tokenGenerator } = {}) {
    this.tokenGenerator = tokenGenerator
  }

  async handle(httpRequest) {
    try {
      const token = httpRequest.headers.authorization
      const [, accessToken] = token.split(' ')

      if (accessToken) {
        const verifyToken = await this.tokenGenerator.verify(accessToken)
        if (verifyToken) {
          return HttpResponse.ok({ verifyToken })
        }
      }

      return HttpResponse.accessDenidedError()
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}