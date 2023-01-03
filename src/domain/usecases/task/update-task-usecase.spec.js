const UpdateTaskUseCase = require("./update-task-usecase")

const makeFakeResult = () => ({
  id: 1,
  title: 'any_title',
  description: 'any_description',
  completed: false,
  user_id: 2
})

const makeLoadTaskByIdRepository = () => {
  class LoadTaskByIdRepositorySpy {
    async load(id) {
      this.id = id
      return makeFakeResult()
    }
  }

  return new LoadTaskByIdRepositorySpy()
}

const makeUpdateTaskByIdRepository = () => {
  class UpdateTaskByIdRepositorySpy {
    async update(id, title, description, completed) {
      this.id = id
      this.title = title
      this.description = description
      this.completed = completed
      const task = {
        id,
        title,
        description,
        completed
      }
      return task
    }
  }

  return new UpdateTaskByIdRepositorySpy()
}

const makeSut = () => {
  const loadTaskByIdRepositorySpy = makeLoadTaskByIdRepository()
  const updateTaskByIdRepositorySpy = makeUpdateTaskByIdRepository()
  const sut = new UpdateTaskUseCase({
    loadTaskByIdRepository: loadTaskByIdRepositorySpy,
    updateTaskByIdRepository: updateTaskByIdRepositorySpy
  })

  return {
    sut,
    loadTaskByIdRepositorySpy,
    updateTaskByIdRepositorySpy
  }
}

describe('UpdateTaskUseCase', () => {
  test('Should throw Error if no LoadTaskByIdRepository is provided', async () => {
    const sut = new UpdateTaskUseCase({
      updateTaskByIdRepository: makeUpdateTaskByIdRepository()
    })

    const promise = sut.updateTask(1, { title: 'changed' })
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if LoadTaskByIdRepository has no load method', async () => {
    const sut = new UpdateTaskUseCase({
      loadTaskByIdRepository: {},
      updateTaskByIdRepository: makeUpdateTaskByIdRepository()
    })

    const promise = sut.updateTask(1, { title: 'changed' })
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if no UpdateTaskByIdRepository is provided', async () => {
    const sut = new UpdateTaskUseCase({
      loadTaskByIdRepository: makeLoadTaskByIdRepository()
    })

    const promise = sut.updateTask(1, { title: 'changed' })
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if UpdateTaskByIdRepository has no update method', async () => {
    const sut = new UpdateTaskUseCase({
      loadTaskByIdRepository: makeLoadTaskByIdRepository(),
      updateTaskByIdRepository: {}
    })

    const promise = sut.updateTask(1, { title: 'changed' })
    expect(promise).rejects.toThrow()
  })

  test('Should call LoadTaskByIdRepository with correct id', async () => {
    const { sut, loadTaskByIdRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadTaskByIdRepositorySpy, 'load')
    await sut.updateTask(1, { title: 'changed' })

    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  test('Should call UpdateTaskByIdRepository with correct values', async () => {
    const { sut, updateTaskByIdRepositorySpy } = makeSut()
    const updateSpy = jest.spyOn(updateTaskByIdRepositorySpy, 'update')
    await sut.updateTask(1, { title: 'changed' })

    expect(updateSpy).toHaveBeenCalledWith(1, 'changed', 'any_description', false)
  })

  test('Should return null if task not exists', async () => {
    const { sut, loadTaskByIdRepositorySpy } = makeSut()
    jest
      .spyOn(loadTaskByIdRepositorySpy, 'load')
      .mockReturnValueOnce(null)

    const task = await sut.updateTask(1, { title: 'title changed' })

    expect(task).toBeNull()
  })

  test('Should return task updated', async () => {
    const { sut } = makeSut()
    const task = await sut.updateTask(1, { title: 'title changed' })

    expect(task.title).toBe('title changed')
  })
})