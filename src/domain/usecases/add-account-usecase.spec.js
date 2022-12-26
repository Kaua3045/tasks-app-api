const { MissingParamError } = require("../../utils/errors")
const { UserAlreadyExistsError } = require("../errors")
const AddAccountUseCase = require("./add-account-usecase")

const makeEncrypter = () => {
  class EncrypterSpy {
    async generate(password) {
      this.password = password
      return this.hashedPassword
    }
  }

  const encrypterSpy = new EncrypterSpy()
  return encrypterSpy
}

const makeLoadUserByEmailRepository = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      this.email = email
      return this.user
    }
  }

  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  return loadUserByEmailRepositorySpy
}

const makeSut = () => {
  const encrypterSpy = makeEncrypter()
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
  const sut = new AddAccountUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    encrypter: encrypterSpy
  })
  return {
    sut,
    loadUserByEmailRepositorySpy,
    encrypterSpy
  }
}

describe('AddAccount UseCase', () => {
  test('Should throw MissingParamError if no name is provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.addAccount({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('Should throw MissingParamError if no email is provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.addAccount({
      name: 'any_name',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw MissingParamError if no password is provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should throw UserAlreadyExistsError if email already exists', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.load = jest.fn().mockReturnValueOnce(true)
    const addAccount = sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(addAccount).rejects.toThrow(new UserAlreadyExistsError())
  })

  test('Should throw Error if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AddAccountUseCase({})
    const promise = sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if no Encrypter is provided', async () => {
    const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
    const sut = new AddAccountUseCase({
      loadUserByEmailRepository: loadUserByEmailRepositorySpy
    })

    const promise = sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if Encrypter has no generate method', async () => {
    const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
    const sut = new AddAccountUseCase({
      loadUserByEmailRepository: loadUserByEmailRepositorySpy,
      encrypter: {}
    })

    const promise = sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@mail.com')
  })

  test('Should call Encrypter with correct value', async () => {
    const { sut, encrypterSpy } = makeSut()
    await sut.addAccount({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(encrypterSpy.password).toBe('any_password')
  })
})