const { MissingParamError } = require("../../utils/errors")
const { UserAlreadyExistsError } = require("../errors")
const AddAccountUseCase = require("./add-account-usecase")

const makeFakeUser = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
}

const makeEncrypter = () => {
  class EncrypterSpy {
    async generate(password) {
      this.password = password
      this.hashedPassword = password
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

const makeAddAccountRepository = () => {
  class AddAccountRepositorySpy {
    async saveAccount(name, email, password) {
      this.name = name
      this.email = email
      this.password = password
      return this.user
    }
  }

  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  addAccountRepositorySpy.user = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password'
  }
  return addAccountRepositorySpy
}

const makeSut = () => {
  const encrypterSpy = makeEncrypter()
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
  const addAccountRepositorySpy = makeAddAccountRepository()
  const sut = new AddAccountUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    encrypter: encrypterSpy,
    addAccountRepository: addAccountRepositorySpy
  })
  return {
    sut,
    loadUserByEmailRepositorySpy,
    addAccountRepositorySpy,
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
    const addAccount = sut.addAccount(makeFakeUser)
    expect(addAccount).rejects.toThrow(new UserAlreadyExistsError())
  })

  test('Should throw Error if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.addAccount(makeFakeUser)

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AddAccountUseCase({})
    const promise = sut.addAccount(makeFakeUser)

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if no Encrypter is provided', async () => {
    const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
    const sut = new AddAccountUseCase({
      loadUserByEmailRepository: loadUserByEmailRepositorySpy
    })

    const promise = sut.addAccount(makeFakeUser)
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if Encrypter has no generate method', async () => {
    const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
    const sut = new AddAccountUseCase({
      loadUserByEmailRepository: loadUserByEmailRepositorySpy,
      encrypter: {}
    })

    const promise = sut.addAccount(makeFakeUser)
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if no AddAccountRepository is provided', async () => {
    const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
    const encrypterSpy = makeEncrypter()
    const sut = new AddAccountUseCase({
      loadUserByEmailRepository: loadUserByEmailRepositorySpy,
      encrypter: encrypterSpy
    })

    const promise = sut.addAccount(makeFakeUser)
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if AddAccountRepository has no saveAccount method', async () => {
    const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
    const encrypterSpy = makeEncrypter()
    const sut = new AddAccountUseCase({
      loadUserByEmailRepository: loadUserByEmailRepositorySpy,
      encrypter: encrypterSpy
    })

    const promise = sut.addAccount(makeFakeUser)
    expect(promise).rejects.toThrow()
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.addAccount(makeFakeUser)
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@mail.com')
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    await sut.addAccount(makeFakeUser)

    expect(addAccountRepositorySpy.email).toBe('any_email@mail.com')
    expect(addAccountRepositorySpy.name).toBe('any_name')
    expect(addAccountRepositorySpy.password).toBe('any_password')
  })

  test('Should return user with success created', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    await sut.addAccount(makeFakeUser)

    expect(addAccountRepositorySpy.user.email).toBe('any_email@mail.com')
    expect(addAccountRepositorySpy.user.name).toBe('any_name')
    expect(addAccountRepositorySpy.user.password).toBe('hashed_password')
  })

  test('Should call Encrypter with correct value', async () => {
    const { sut, addAccountRepositorySpy, encrypterSpy } = makeSut()
    await sut.addAccount(makeFakeUser)
    encrypterSpy.hashedPassword = 'hashed_password'

    expect(encrypterSpy.password).toBe('any_password')
    expect(encrypterSpy.hashedPassword).toBe(addAccountRepositorySpy.user.password)
  })
})