module.exports = class ExpressMiddlewareAdapter {
  static adaptMiddleware(middleware) {
    return async (req, res, next) => {
      const httpRequest = {
        headers: req.headers
      }

      const httpResponse = await middleware.handle(httpRequest)
      if (httpResponse.statusCode === 200) {
        next()
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    }
  }
}