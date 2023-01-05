const { ServerError, UnauthorizedError, AccessDenidedError } = require('../errors')

module.exports = class HttpResponse {
  static ok(body) {
    return {
      statusCode: 200,
      body
    }
  }

  static noContent() {
    return {
      statusCode: 204,
      body: null
    }
  }

  static badRequest(error) {
    return {
      statusCode: 400,
      body: {
        error: error.message
      }
    }
  }

  static unauthorizedError() {
    return {
      statusCode: 401,
      body: {
        error: new UnauthorizedError().message
      }
    }
  }

  static accessDenidedError() {
    return {
      statusCode: 403,
      body: {
        error: new AccessDenidedError().message
      }
    }
  }

  static serverError() {
    return {
      statusCode: 500,
      body: {
        error: new ServerError().message
      }
    }
  }
}