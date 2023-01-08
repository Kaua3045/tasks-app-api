const { TaskNotFoundError } = require("../../../domain/errors")
const { MissingParamError } = require("../../../utils/errors")
const { ServerError } = require("../../errors")
const UpdateTaskByIdController = require("./update-task-by-id-controller")

const makeFakeRequest = () => ({
  body: {
    title: 'any_title'
  },
  params: {
    id: 1
  }
})

const makeFakeResult = () => ({
  id: 1,
  title: 'any_title',
  description: 'any_description',
  completed: false,
  user_id: 2
})

const makeUpdateTaskUseCase = () => {
  class UpdateTaskUseCase {
    async updateTask(id, data) {
      this.id = id
      this.data = data
      return makeFakeResult()
    }
  }

  return new UpdateTaskUseCase()
}

const makeSut = () => {
  const updateTaskUseCaseSpy = makeUpdateTaskUseCase()
  const sut = new UpdateTaskByIdController({
    updateTaskUseCase: updateTaskUseCaseSpy
  })

  return {
    sut,
    updateTaskUseCaseSpy
  }
}

describe('UpdateTaskByIdController', () => {
  test('Should return 400 if no id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_title'
      },
      params: {}
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('id').message)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if httpRequest has no body or params', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call UpdateTaskUseCase with correct params', async () => {
    const { sut, updateTaskUseCaseSpy } = makeSut()
    await sut.handle(makeFakeRequest())

    expect(updateTaskUseCaseSpy.id).toBe(makeFakeRequest().params.id)
    expect(updateTaskUseCaseSpy.data.title).toBe(makeFakeRequest().body.title)
  })

  test('Should return 400 if no task found', async () => {
    const { sut, updateTaskUseCaseSpy } = makeSut()
    jest
      .spyOn(updateTaskUseCaseSpy, 'updateTask')
      .mockReturnValueOnce(null)

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new TaskNotFoundError().message)
  })

  test('Should return 200 when task updated', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.task).toEqual(makeFakeResult())
  })

  test('Should throw ServerError if invalid dependencies are provided', async () => {
    const suts = [].concat(
      new UpdateTaskByIdController(),
      new UpdateTaskByIdController({})
    )

    for (const sut of suts) {
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toBe(new ServerError().message)
    }
  })
})