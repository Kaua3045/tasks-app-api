const { MissingParamError } = require('../../utils/errors')
const AddTasksUseCase = require("./add-tasks-usecase")

describe('AddTasks UseCase', () => {
  test('Should throw MissingParamError if no title provided', async () => {
    const sut = new AddTasksUseCase()
    const promise = sut.addTask({
      description: 'any_description',
      user_id: 1
    })
    expect(promise).rejects.toThrow(new MissingParamError('title'))
  })

  test('Should throw MissingParamError if no description provided', async () => {
    const sut = new AddTasksUseCase()
    const promise = sut.addTask({
      title: 'any_title',
      user_id: 1
    })
    expect(promise).rejects.toThrow(new MissingParamError('description'))
  })

  test('Should throw MissingParamError if no user_id provided', async () => {
    const sut = new AddTasksUseCase()
    const promise = sut.addTask({
      title: 'any_title',
      description: 'any_description'
    })
    expect(promise).rejects.toThrow(new MissingParamError('user_id'))
  })

  test('Should throw Error if no AddTaskRepository is provided', async () => {
    const sut = new AddTasksUseCase()
    const promise = sut.addTask({
      title: 'any_title',
      description: 'any_description',
      user_id: 1
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if AddTaskRepository has no saveTask method', async () => {
    const sut = new AddTasksUseCase({})
    const promise = sut.addTask({
      title: 'any_title',
      description: 'any_description',
      user_id: 1
    })
    expect(promise).rejects.toThrow()
  })

  test('Should call AddTaskRepository with correct values', async () => {
    class AddTaskRepositorySpy {
      async saveTask(title, description, user_id) {
        this.title = title
        this.description = description
        this.user_id = user_id
        return this.task
      }
    }
    const addTaskRepositorySpy = new AddTaskRepositorySpy()
    const sut = new AddTasksUseCase({
      addTaskRepository: addTaskRepositorySpy
    })
    await sut.addTask({
      title: 'any_title',
      description: 'any_description',
      user_id: 1
    })

    expect(addTaskRepositorySpy.title).toBe('any_title')
    expect(addTaskRepositorySpy.description).toBe('any_description')
    expect(addTaskRepositorySpy.user_id).toBe(1)
  })

  test('Should return task with success created', async () => {
    class AddTaskRepositorySpy {
      async saveTask(title, description, user_id) {
        this.title = title
        this.description = description
        this.user_id = user_id
        return this.task
      }
    }
    const addTaskRepositorySpy = new AddTaskRepositorySpy()
    addTaskRepositorySpy.task = {
      title: 'any_title',
      description: 'any_description',
      user_id: 1
    }
    const sut = new AddTasksUseCase({
      addTaskRepository: addTaskRepositorySpy
    })
    await sut.addTask({
      title: 'any_title',
      description: 'any_description',
      user_id: 1
    })

    expect(addTaskRepositorySpy.task.title).toBe('any_title')
    expect(addTaskRepositorySpy.task.description).toBe('any_description')
    expect(addTaskRepositorySpy.task.user_id).toBe(1)
  })
})