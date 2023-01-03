const HttpResponse = require('../../helpers/http-response')
const { MissingParamError } = require('../../../utils/errors')
const { TaskNotFoundError } = require('../../../domain/errors')

module.exports = class UpdateTaskByIdController {
  constructor({ updateTaskUseCase } = {}) {
    this.updateTaskUseCase = updateTaskUseCase
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body
      const { id } = httpRequest.params

      if (!id) {
        return HttpResponse.badRequest(new MissingParamError('id'));
      }

      const task = await this.updateTaskUseCase.updateTask(id, data)

      if (!task) {
        return HttpResponse.badRequest(new TaskNotFoundError())
      }

      return HttpResponse.ok({ task })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}