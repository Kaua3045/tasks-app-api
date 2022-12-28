module.exports = class ExpressRouterAdapter {
  static adapt(controller) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body,
        params: req.params
      }

      const httpResponse = await controller.handle(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}