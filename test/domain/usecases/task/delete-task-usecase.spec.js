const DeleteTaskUseCase = require("../../../../src/domain/usecases/task/delete-task-usecase")

const makeFakeResult = () => ({
  id: 1,
  title: 'any_title',
  description: 'any_description',
  completed: false,
  user_id: 2
})

const makeDeleteTaskRepository = () => {
  class DeleteTaskRepositoryStub {
    async remove(id) {
      this.id = id
    }
  }

  return new DeleteTaskRepositoryStub()
}

const makeLoadTaskByIdRepository = () => {
  class LoadTaskByIdRepositoryStub {
    async loadTask(id) {
      this.id = id
      return makeFakeResult()
    }
  }

  return new LoadTaskByIdRepositoryStub()
}

const makeSut = () => {
  const loadTaskByIdRepositorySpy = makeLoadTaskByIdRepository()
  const deleteTaskRepositorySpy = makeDeleteTaskRepository()
  const sut = new DeleteTaskUseCase({
    loadTaskByIdRepository: loadTaskByIdRepositorySpy,
    deleteTaskRepository: deleteTaskRepositorySpy
  })

  return {
    sut,
    loadTaskByIdRepositorySpy,
    deleteTaskRepositorySpy
  }
}

describe('DeleteTaskUseCase', () => {
  test('Should throw Error if no LoadTaskByIdRepository is provided', async () => {
    const sut = new DeleteTaskUseCase({
      deleteTaskRepository: makeDeleteTaskRepository()
    })

    const promise = sut.delete(1)

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if LoadTaskByIdRepository has no loadTask', async () => {
    const sut = new DeleteTaskUseCase({
      loadTaskByIdRepository: {},
      deleteTaskRepository: makeDeleteTaskRepository()
    })

    const promise = sut.delete(1)

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if no DeleteTaskRepository is provided', async () => {
    const sut = new DeleteTaskUseCase({
      loadTaskByIdRepository: makeLoadTaskByIdRepository()
    })

    const promise = sut.delete(1)

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if DeleteTaskRepository has no remove', async () => {
    const sut = new DeleteTaskUseCase({
      loadTaskByIdRepository: makeLoadTaskByIdRepository(),
      deleteTaskRepository: {}
    })

    const promise = sut.delete(1)

    expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadTaskByIdRepository returns null', async () => {
    const { sut, loadTaskByIdRepositorySpy } = makeSut()
    jest
      .spyOn(loadTaskByIdRepositorySpy, 'loadTask')
      .mockReturnValueOnce(null)

    const task = await sut.delete(1)

    expect(task).toBeNull()
  })

  test('Should call LoadTaskByIdRepository with correct id', async () => {
    const { sut, loadTaskByIdRepositorySpy } = makeSut()
    const loadTaskSpy = jest.spyOn(loadTaskByIdRepositorySpy, 'loadTask')

    await sut.delete(1)
    expect(loadTaskSpy).toHaveBeenCalledWith(1)
  })

  test('Should call DeleteTaskRepository with correct id', async () => {
    const { sut, deleteTaskRepositorySpy } = makeSut()
    const removeSpy = jest.spyOn(deleteTaskRepositorySpy, 'remove')

    await sut.delete(1)
    expect(removeSpy).toHaveBeenCalledWith(1)
  })
})