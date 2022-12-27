const { MissingParamError } = require("../../utils/errors")
const { UserAlreadyExistsError } = require("../errors")
const AddAccountUseCase = require("./add-account-usecase")

const makeFakeUserResult = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
})

const makeFakeUser = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeEncrypter = () => {
  class EncrypterStub {
    async generate(password) {
      const hashedPassword = 'hashed_password'
      return hashedPassword
    }
  }
  return new EncrypterStub()
}

const makeLoadUserByEmailRepository = () => {
  class LoadUserByEmailRepositoryStub {
    async load(email) {
      return null
    }
  }
  return new LoadUserByEmailRepositoryStub()
}

const makeAddAccountRepository = () => {
  class AddAccountRepositoryStub {
    async saveAccount(name, email, password) {
      return makeFakeUserResult()
    }
  }
  return new AddAccountRepositoryStub()
}

const makeSut = () => {
  const encrypterStub = makeEncrypter()
  const loadUserByEmailRepositoryStub = makeLoadUserByEmailRepository()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new AddAccountUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositoryStub,
    encrypter: encrypterStub,
    addAccountRepository: addAccountRepositoryStub
  })
  return {
    sut,
    loadUserByEmailRepositoryStub,
    addAccountRepositoryStub,
    encrypterStub
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
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadUserByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(makeFakeUserResult())

    const addAccount = await sut.addAccount(makeFakeUser())
    expect(addAccount).toBe(false)
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
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'load')
    await sut.addAccount(makeFakeUser())

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'saveAccount')

    await sut.addAccount(makeFakeUser())
    expect(addSpy).toHaveBeenCalledWith('any_name', 'any_email@mail.com', 'hashed_password')
  })

  test('Should return user with success created', async () => {
    const { sut } = makeSut()
    const account = await sut.addAccount(makeFakeUser())
    expect(account.userCreated).toEqual(makeFakeUserResult())
  })

  test('Should call Encrypter with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'generate')

    await sut.addAccount(makeFakeUser())
    expect(encrypterSpy).toHaveBeenCalledWith('any_password')
  })
})