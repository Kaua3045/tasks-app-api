const LoadTaskByIdUseCase = require("./load-task-by-id-usecase")

const makeFakeTaskResult = () => ({
  id: 1,
  title: 'any_task',
  description: 'any_description',
  user_id: 1
})

const makeLoadTaskByIdRepository = () => {
  class LoadTaskByIdRepositoryStub {
    async loadTask(id) {
      return makeFakeTaskResult()
    }
  }
  return new LoadTaskByIdRepositoryStub()
}

const makeSut = () => {
  const loadTaskByIdRepositoryStub = makeLoadTaskByIdRepository()
  const sut = new LoadTaskByIdUseCase({ loadTaskByIdRepository: loadTaskByIdRepositoryStub })

  return {
    sut,
    loadTaskByIdRepositoryStub
  }
}

describe('LoadTaskById UseCase', () => {
  test('Should return null if not exists task', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadTaskByIdRepositoryStub, 'loadTask')
      .mockReturnValueOnce(null)

    const task = await sut.load(1)
    expect(task).toBeNull()
  })

  test('Should throw Error if no LoadTaskByIdRepository is provided', async () => {
    const sut = new LoadTaskByIdUseCase()
    const promise = sut.load(1)
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if LoadTaskByIdRepository has no loadTask method', async () => {
    const sut = new LoadTaskByIdUseCase({})
    const promise = sut.load(1)
    expect(promise).rejects.toThrow()
  })

  test('Should call LoadTaskByIdRepository with correct id', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    const loadTaskSpy = jest.spyOn(loadTaskByIdRepositoryStub, 'loadTask').mockReturnValueOnce(1)

    await sut.load(1)
    expect(loadTaskSpy).toHaveBeenCalledWith(1)
  })

  test('Should return task', async () => {
    const { sut } = makeSut()
    const taskLoaded = await sut.load(1)
    
    expect(taskLoaded.task).toEqual(makeFakeTaskResult())
  })
})