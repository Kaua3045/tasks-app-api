const { TaskNotFoundError } = require("../../../domain/errors")
const { MissingParamError } = require("../../../utils/errors")
const { ServerError } = require("../../errors")
const DeleteTaskController = require("./delete-task-controller")

const makeFakeRequest = () => ({
  params: {
    id: 1
  }
})

const makeDeleteTaskUseCase = () => {
  class DeleteTaskUseCaseSpy {
    async delete(id) {
      this.id = id
    }
  }

  return new DeleteTaskUseCaseSpy()
}

const makeSut = () => {
  const deleteTaskUseCaseSpy = makeDeleteTaskUseCase()
  const sut = new DeleteTaskController({
    deleteTaskUseCase: deleteTaskUseCaseSpy
  })

  return {
    sut,
    deleteTaskUseCaseSpy
  }
}

describe('DeleteTaskController', () => {
  test('Should return 400 if no id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('id').message)
  })

  test('Should return 400 if task not found', async () => {
    const { sut, deleteTaskUseCaseSpy } = makeSut()
    jest
      .spyOn(deleteTaskUseCaseSpy, 'delete')
      .mockReturnValueOnce(null)

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new TaskNotFoundError().message)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if httpRequest has no params', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call DeleteTaskUseCase with correct id', async () => {
    const { sut, deleteTaskUseCaseSpy } = makeSut()

    await sut.handle(makeFakeRequest())

    expect(deleteTaskUseCaseSpy.id).toBe(makeFakeRequest().params.id)
  })

  test('Should return 200 if task deleted', async () => {
    const { sut }  = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(204)
  })

  test('Should throw ServerError if invalid dependencies are provided', async () => {
    const suts = [].concat(
      new DeleteTaskController(),
      new DeleteTaskController({})
    )

    for (const sut of suts) {
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toBe(new ServerError().message)
    }
  })
})