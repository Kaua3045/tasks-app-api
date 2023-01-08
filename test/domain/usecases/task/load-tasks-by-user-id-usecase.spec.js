const LoadTasksByUserIdUseCase = require("../../../../src/domain/usecases/task/load-tasks-by-user-id-usecase")

const userId = '7463c662-d6ef-45ec-9257-f5eb343ab02d'

const makeFakeResult = () => ([
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    completed: false,
    user_id: userId
  }
])

const makeLoadTasksByUserIdRepository = () => {
  class LoadTasksByUserIdRepositoryStub {
    async loadAllTask(user_id) {
      return makeFakeResult()
    }
  }

  return new LoadTasksByUserIdRepositoryStub()
}

const makeSut = () => {
  const loadTasksByUserIdRepositoryStub = makeLoadTasksByUserIdRepository()
  const sut = new LoadTasksByUserIdUseCase({
    loadTasksByUserIdRepository: loadTasksByUserIdRepositoryStub
  })

  return {
    sut,
    loadTasksByUserIdRepositoryStub
  }
}

describe('LoadTasksByUserId UseCase', () => {
  test('Should throw Error if no LoadTasksByUserIdRepository is provided', async () => {
    const sut = new LoadTasksByUserIdUseCase()
    const promise = sut.loadAll(userId)

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if LoadTasksByUserIdRepository has no loadAllTask method', async () => {
    const sut = new LoadTasksByUserIdUseCase({})
    const promise = sut.loadAll(userId)

    expect(promise).rejects.toThrow()
  })

  test('Should call LoadTasksByUserIdRepository with correct user_id', async () => {
    const { sut, loadTasksByUserIdRepositoryStub } = makeSut()
    const loadAllTasksSpy = jest.spyOn(loadTasksByUserIdRepositoryStub, 'loadAllTask').mockReturnValueOnce(userId)

    await sut.loadAll(userId)
    expect(loadAllTasksSpy).toHaveBeenCalledWith(userId)
  })

  test('Should return array tasks', async () => {
    const { sut } = makeSut()
    const tasks = await sut.loadAll(userId)

    expect(tasks).toEqual(makeFakeResult())
  })
})