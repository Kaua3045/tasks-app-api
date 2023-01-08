const { TaskNotFoundError } = require("../../../../src/domain/errors")
const { MissingParamError } = require("../../../../src/utils/errors")
const { ServerError } = require("../../../../src/presentation/errors")
const LoadTaskByIdController = require("../../../../src/presentation/controllers/task/load-task-by-id-controller")

const makeFakeRequest = () => ({
  params: {
    id: 1
  }
})

const makeFakeResult = () => ({
  task: {
    id: 1,
    title: 'any_title',
    description: 'any_description',
    user_id: 2
  }
})

const makeLoadTaskByIdUseCase = () => {
  class LoadTaskByIdUseCase {
    async load(id) {
      this.id = id
      return makeFakeResult()
    }
  }

  return new LoadTaskByIdUseCase()
}

const makeSut = () => {
  const loadTaskByIdUseCaseSpy = makeLoadTaskByIdUseCase()
  const sut = new LoadTaskByIdController({
    loadTaskByIdUseCase: loadTaskByIdUseCaseSpy
  })

  return {
    sut,
    loadTaskByIdUseCaseSpy
  }
}

describe('LoadTaskByIdController', () => {
  test('Should return 400 if no id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
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

  test('Should return 500 if httpRequest has no params', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call LoadTaskByIdUseCase with correct id', async () => {
    const { sut, loadTaskByIdUseCaseSpy } = makeSut()
    await sut.handle(makeFakeRequest())

    expect(loadTaskByIdUseCaseSpy.id).toBe(makeFakeRequest().params.id)
  })

  test('Should return 400 if no task found', async () => {
    const { sut, loadTaskByIdUseCaseSpy } = makeSut()
    jest
      .spyOn(loadTaskByIdUseCaseSpy, 'load')
      .mockReturnValueOnce(null)
    
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new TaskNotFoundError().message)
  })

  test('Should return 200 and the id s task', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.task).toEqual(makeFakeResult().task)
  })

  test('Should throw ServerError if invalid dependencies are provided', async () => {
    const suts = [].concat(
      new LoadTaskByIdController(),
      new LoadTaskByIdController({})
    )

    for (const sut of suts) {
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toBe(new ServerError().message)
    }
  })
})