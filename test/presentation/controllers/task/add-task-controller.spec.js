const { MissingParamError } = require("../../../../src/utils/errors")
const { ServerError } = require("../../../../src/presentation/errors")
const AddTaskController = require("../../../../src/presentation/controllers/task/add-task-controller")

const makeFakeRequest = () => ({
  body: {
    title: 'any_title',
    description: 'any_description',
    user_id: 2
  }
})

const makeFakeResult = () => ({
  taskCreated: {
    id: 1,
    title: 'any_title',
    description: 'any_description',
    user_id: 2
  }
})

const makeAddTaskUseCase = () => {
  class AddTaskUseCase {
    async addTask({ title, description, user_id }) {
      this.title = title
      this.description = description
      this.user_id = user_id
      return makeFakeResult()
    }
  }

  return new AddTaskUseCase()
}

const makeSut = () => {
  const addTaskUseCaseSpy = makeAddTaskUseCase()
  const sut = new AddTaskController({
    addTaskUseCase: addTaskUseCaseSpy
  })

  return {
    sut,
    addTaskUseCaseSpy
  }
}

describe('AddTaskController', () => {
  test('Should return 400 if no title is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        description: 'any_description',
        user_id: 2
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('title').message)
  })

  test('Should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_title',
        user_id: 2
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('description').message)
  })

  test('Should return 400 if no user_id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_title',
        description: 'any_description'
      }
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

  test('Should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call AddTaskUseCase with correct params', async () => {
    const { sut, addTaskUseCaseSpy } = makeSut()
    await sut.handle(makeFakeRequest())

    expect(addTaskUseCaseSpy.title).toBe(makeFakeRequest().body.title)
    expect(addTaskUseCaseSpy.description).toBe(makeFakeRequest().body.description)
    expect(addTaskUseCaseSpy.user_id).toBe(makeFakeRequest().body.user_id)
  })

  test('Should return 200 when task was created', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.task).toEqual(makeFakeResult().taskCreated)
  })

  test('Should throw ServerError if invalid dependencies are provided', async () => {
    const suts = [].concat(
      new AddTaskController(),
      new AddTaskController({})
    )

    for (const sut of suts) {
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toBe(new ServerError().message)
    }
  })
})