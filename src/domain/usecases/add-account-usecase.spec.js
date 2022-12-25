const { MissingParamError } = require("../../utils/errors")
const { UserAlreadyExistsError } = require("../errors")
const AddAccountUseCase = require("./add-account-usecase")

describe('AddAccount UseCase', () => {
  test('Should throw if no name is provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.addAccount({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('Should throw if no email is provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.addAccount({
      name: 'any_name',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should throw if email already exists', async () => {
    class LoadUserByEmailRepositorySpy {
      async load(email) {
        this.email = email
        return this.user
      }
    }
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    loadUserByEmailRepositorySpy.load = jest.fn().mockReturnValueOnce(true)
    const sut = new AddAccountUseCase({ loadUserByEmailRepository: loadUserByEmailRepositorySpy })
    const addAccount = sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(addAccount).rejects.toThrow(new UserAlreadyExistsError())
  })

  test('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AddAccountUseCase({})
    const promise = sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(promise).rejects.toThrow()
  })
})