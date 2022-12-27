const { MissingParamError } = require("../../utils/errors")
const HttpResponse = require("../helpers/http-response")

module.exports = class AddTaskController {
  constructor({ addTaskUseCase } = {}) {
    this.addTaskUseCase = addTaskUseCase
  }

  async handle(httpRequest) {
    try {
      const { title, description, user_id } = httpRequest.body
      if (!title) {
        return HttpResponse.badRequest(new MissingParamError('title'))
      }
      if (!description) {
        return HttpResponse.badRequest(new MissingParamError('description'))
      }
      if (!user_id) {
        return HttpResponse.badRequest(new MissingParamError('user_id'))
      }

      const task = await this.addTaskUseCase.addTask({ title, description, user_id })

      return HttpResponse.ok({ task: task.taskCreated })
    } catch(error) {
      return HttpResponse.serverError()
    }
  }
}