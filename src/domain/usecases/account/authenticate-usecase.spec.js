const AuthenticateUseCase = require("./authenticate-usecase")

const makeFakeAccountRequest = () => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeFakeAccountResult = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepository = () => {
  class LoadAccountByEmailRepositoryStub {
    async load(email) {
      return makeFakeAccountResult()
    }
  }

  return new LoadAccountByEmailRepositoryStub
}

const makeEncrypter = () => {
  class EncrypterStub {
    async compare(value, hash) {
      return true
    }
  }

  return new EncrypterStub()
}

const makeTokenGenerator = () => {
  class TokenGeneratorStub {
    async generateAccessToken(id) {
      return this.accessToken
    } 
  }

  const tokenGeneratorStub = new TokenGeneratorStub()
  tokenGeneratorStub.accessToken = 'any_token'
  return tokenGeneratorStub
}

const makeSut = () => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const encrypterStub = makeEncrypter()
  const tokenGeneratorStub = makeTokenGenerator()
  const sut = new AuthenticateUseCase({
    loadAccountByEmailRepository: loadAccountByEmailRepositoryStub,
    encrypter: encrypterStub,
    tokenGenerator: tokenGeneratorStub
  })

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    encrypterStub,
    tokenGeneratorStub
  }
}

describe('Authenticate UseCase', () => {
  test('Should throw Error if no LoadAccountByEmailRepository is provided', async () => {
    const sut = new AuthenticateUseCase()
    const promise = sut.auth(makeFakeAccountRequest())

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if LoadAccountByEmailRepository has no load method', async () => {
    const sut = new AuthenticateUseCase({})
    const promise = sut.auth(makeFakeAccountRequest())

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if no Encrypter is provided', async () => {
    const sut = new AuthenticateUseCase({
      loadAccountByEmailRepository: makeLoadAccountByEmailRepository()
    })
    const promise = sut.auth(makeFakeAccountRequest())

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if Encrypter has no compare method', async () => {
    const sut = new AuthenticateUseCase({
      loadAccountByEmailRepository: makeLoadAccountByEmailRepository(),
      encrypter: {}
    })
    const promise = sut.auth(makeFakeAccountRequest())

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if no TokenGenerator is provided', async () => {
    const sut = new AuthenticateUseCase({
      loadAccountByEmailRepository: makeLoadAccountByEmailRepository(),
      encrypter: makeEncrypter()
    })
    const promise = sut.auth(makeFakeAccountRequest())

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if TokenGenerator has no generateAccessToken method', async () => {
    const sut = new AuthenticateUseCase({
      loadAccountByEmailRepository: makeLoadAccountByEmailRepository(),
      encrypter: makeEncrypter(),
      tokenGenerator: {}
    })
    const promise = sut.auth(makeFakeAccountRequest())

    expect(promise).rejects.toThrow()
  })

  test('Should return null if account does not exists', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(null)

    const account = await sut.auth(makeFakeAccountRequest())

    expect(account).toBeNull()
  })

  test('Should return null if passwords not match', async () => {
    const { sut, encrypterStub } = makeSut()
    jest
      .spyOn(encrypterStub, 'compare')
      .mockReturnValueOnce(null)
    const account = await sut.auth(makeFakeAccountRequest())

    expect(account).toBeNull()
  })

  test('Should return an accessToken if correct credentials are provided', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const auth = await sut.auth(makeFakeAccountRequest())
    
    expect(auth.accessToken).toBe(tokenGeneratorStub.accessToken)
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should call Encrypter with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const compareSpy = jest.spyOn(encrypterStub, 'compare')
    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(compareSpy).toHaveBeenCalledWith('any_password', makeFakeAccountResult().password)
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const generateAccessTokenSpy = jest.spyOn(tokenGeneratorStub, 'generateAccessToken')
    await sut.auth(makeFakeAccountRequest())

    expect(generateAccessTokenSpy).toHaveBeenCalledWith(makeFakeAccountResult().id)
  })
})