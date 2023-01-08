const MeAccountUseCase = require("../../../../src/domain/usecases/account/me-account-usecase")

const tokenValue = 'any_token'

const makeTokenResult = () => ({
  _id: 1
})

const makeLoadAccountResult = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com'
})

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    async verify(accessToken) {
      this.accessToken = accessToken
      return makeTokenResult()
    }
  }

  return new TokenGeneratorSpy()
}

const makeLoadAccountByIdRepository = () => {
  class LoadAccountByIdRepositorySpy {
    async loadById(id) {
      this.id = id
      return makeLoadAccountResult()
    }
  }

  return new LoadAccountByIdRepositorySpy()
}

const makeSut = () => {
  const tokenGeneratorSpy = makeTokenGenerator()
  const loadAccountByIdRepositorySpy = makeLoadAccountByIdRepository()
  const sut = new MeAccountUseCase({
    tokenGenerator: tokenGeneratorSpy,
    loadAccountByIdRepository: loadAccountByIdRepositorySpy
  })

  return {
    sut,
    tokenGeneratorSpy,
    loadAccountByIdRepositorySpy
  }
}

describe('MeAccountUseCase', () => {
  test('Should return null if accessToken expired or invalid', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    jest
      .spyOn(tokenGeneratorSpy, 'verify')
      .mockReturnValueOnce(null)

    const account = await sut.meAccount(tokenValue)
    expect(account).toBeNull()
  })

  test('Should return null if not load account', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    jest
      .spyOn(loadAccountByIdRepositorySpy, 'loadById')
      .mockReturnValueOnce(null)
    
    const account = await sut.meAccount(tokenValue)
    expect(account).toBeNull()
  })

  test('Should throw Error if no TokenGenerator is provided', async () => {
    const sut = new MeAccountUseCase({
      loadAccountByIdRepository: makeLoadAccountByIdRepository()
    })

    const promise = sut.meAccount(tokenValue)
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if TokenGenerator no has verify method', async () => {
    const sut = new MeAccountUseCase({
      loadAccountByIdRepository: makeLoadAccountByIdRepository(),
      tokenGenerator: {}
    })

    const promise = sut.meAccount(tokenValue)
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if no LoadAccountByIdRepository is provided', async () => {
    const sut = new MeAccountUseCase({
      tokenGenerator: makeTokenGenerator()
    })

    const promise = sut.meAccount(tokenValue)
    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if LoadAccountByIdRepository has no load method', async () => {
    const sut = new MeAccountUseCase({
      tokenGenerator: makeTokenGenerator(),
      loadAccountByIdRepository: {}
    })

    const promise = sut.meAccount(tokenValue)
    expect(promise).rejects.toThrow()
  })

  test('Should call LoadAccountByIdRepository with correct id', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdRepositorySpy, 'loadById')
    await sut.meAccount(tokenValue)

    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  test('Should call TokenGenerator with correct token', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    const verifySpy = jest.spyOn(tokenGeneratorSpy, 'verify')
    await sut.meAccount(tokenValue)

    expect(verifySpy).toHaveBeenCalledWith(tokenValue)
  })

  test('Should return an account', async () => {
    const { sut } = makeSut()
    const account = await sut.meAccount(tokenValue)

    expect(account).toEqual(makeLoadAccountResult())
  })
})