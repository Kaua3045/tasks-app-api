const { MissingParamError } = require('../../utils/errors')
const AddTaskUseCase = require("./add-task-usecase")

const makeFakeTaskResult = () => ({
  id: 1,
  title: 'any_title',
  description: 'any_description',
  user_id: 1
})

const makeFakeTask = () => ({
  title: 'any_title',
  description: 'any_description',
  user_id: 1
})

const makeAddTaskRepository = () => {
  class AddTaskRepositoryStub {
    async saveTask(title, description, user_id) {
      return makeFakeTaskResult()
    }
  }
  return new AddTaskRepositoryStub()
}

const makeSut = () => {
  const addTaskRepositoryStub = makeAddTaskRepository()
  const sut = new AddTaskUseCase({ addTaskRepository: addTaskRepositoryStub })
  return {
    sut,
    addTaskRepositoryStub
  }
}

describe('AddTasks UseCase', () => {
  test('Should throw MissingParamError if no title provided', async () => {
    const sut = new AddTaskUseCase()
    const promise = sut.addTask({
      description: 'any_description',
      user_id: 1
    })
    expect(promise).rejects.toThrow(new MissingParamError('title'))
  })

  test('Should throw MissingParamError if no description provided', async () => {
    const sut = new AddTaskUseCase()
    const promise = sut.addTask({
      title: 'any_title',
      user_id: 1
    })
    expect(promise).rejects.toThrow(new MissingParamError('description'))
  })

  test('Should throw MissingParamError if no user_id provided', async () => {
    const sut = new AddTaskUseCase()
    const promise = sut.addTask({
      title: 'any_title',
      description: 'any_description'
    })
    expect(promise).rejects.toThrow(new MissingParamError('user_id'))
  })

  test('Should throw Error if no AddTaskRepository is provided', async () => {
    const sut = new AddTaskUseCase()
    const promise = sut.addTask({
      title: 'any_title',
      description: 'any_description',
      user_id: 1
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if AddTaskRepository has no saveTask method', async () => {
    const sut = new AddTaskUseCase({})
    const promise = sut.addTask({
      title: 'any_title',
      description: 'any_description',
      user_id: 1
    })
    expect(promise).rejects.toThrow()
  })

  test('Should call AddTaskRepository with correct values', async () => {
    const { sut, addTaskRepositoryStub} = makeSut()
    const addSpy = jest.spyOn(addTaskRepositoryStub, 'saveTask')

    await sut.addTask(makeFakeTask())
    expect(addSpy).toHaveBeenCalledWith('any_title', 'any_description', 1)
  })

  test('Should return task with success created', async () => {
    const { sut } = makeSut()

    const task = await sut.addTask(makeFakeTask())
    expect(task.taskCreated).toEqual(makeFakeTaskResult())
  })
})