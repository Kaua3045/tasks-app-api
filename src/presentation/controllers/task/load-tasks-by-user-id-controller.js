const { MissingParamError } = require("../../../utils/errors")
const HttpResponse = require("../../helpers/http-response")

module.exports = class LoadTasksByUserIdController {
  constructor({ loadTasksByUserIdUseCase } = {}) {
    this.loadTasksByUserIdUseCase = loadTasksByUserIdUseCase
  }

  async handle(httpRequest) {
    try {
      const { userId } = httpRequest.params
      if (!userId) {
        return HttpResponse.badRequest(new MissingParamError('user_id'))
      }

      const tasks = await this.loadTasksByUserIdUseCase.loadAll(userId)

      return HttpResponse.ok({ tasks })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}