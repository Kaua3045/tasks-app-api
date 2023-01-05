const HttpResponse = require('../../helpers/http-response')
const { MissingParamError } = require('../../../utils/errors')
const { TaskNotFoundError } = require('../../../domain/errors')

module.exports = class DeleteTaskController {
  constructor({ deleteTaskUseCase } = {}) {
    this.deleteTaskUseCase = deleteTaskUseCase
  }

  async handle(httpRequest) {
    try {
      const { id } = httpRequest.params

      if (!id) {
        return HttpResponse.badRequest(new MissingParamError('id'))
      }

      const task = await this.deleteTaskUseCase.delete(id)

      if (task === null) {
        return HttpResponse.badRequest(new TaskNotFoundError())
      }

      return HttpResponse.noContent()
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}