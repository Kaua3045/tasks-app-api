const { MissingParamError } = require("../../../../src/utils/errors")
const { ServerError } = require("../../../../src/presentation/errors")
const LoadTasksByUserIdController = require("../../../../src/presentation/controllers/task/load-tasks-by-user-id-controller")

const makeFakeRequest = () => ({
  params: {
    userId: 1
  }
})

const makeFakeResult = () => ({
  tasks: [
    {
      id: 1,
      title: 'any_title',
      description: 'any_description',
      user_id: 2
    },
    {
      id: 2,
      title: 'any_title',
      description: 'any_description',
      user_id: 2
    }
  ]
})

const makeLoadTaskByUserId = () => {
  class LoadTaskByUserIdUseCaseSpy {
    async loadAll(id) {
      this.id = id
      return makeFakeResult()
    }
  }

  return new LoadTaskByUserIdUseCaseSpy()
}

const makeSut = () => {
  const loadTaskByUserIdUseCaseSpy = makeLoadTaskByUserId()
  const sut = new LoadTasksByUserIdController({
    loadTasksByUserIdUseCase: loadTaskByUserIdUseCaseSpy
  })

  return {
    sut,
    loadTaskByUserIdUseCaseSpy
  }
}

describe('LoadTasksByUserIdController', () => {
  test('Should return 400 if no user_id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('user_id').message)
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

  test('Should call LoadTasksByUserIdUseCase with correct user_id', async () => {
    const { sut, loadTaskByUserIdUseCaseSpy } = makeSut()
    await sut.handle(makeFakeRequest())

    expect(loadTaskByUserIdUseCaseSpy.id).toBe(makeFakeRequest().params.userId)
  })

  test('Should return 200 and the tasks with user_id', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.tasks).toEqual(makeFakeResult())
  })

  test('Should throw ServerError if invalid dependencies are provided', async () => {
    const suts = [].concat(
      new LoadTasksByUserIdController(),
      new LoadTasksByUserIdController({})
    )

    for (const sut of suts) {
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toBe(new ServerError().message)
    }
  })
})