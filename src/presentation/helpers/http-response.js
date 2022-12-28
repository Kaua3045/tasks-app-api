const { ServerError } = require('../errors')

module.exports = class HttpResponse {
  static ok(body) {
    return {
      statusCode: 200,
      body
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

  static serverError() {
    return {
      statusCode: 500,
      body: {
        error: new ServerError().message
      }
    }
  }
}