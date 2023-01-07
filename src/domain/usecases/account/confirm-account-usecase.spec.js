const ConfirmAccountUseCase = require("./confirm-account-usecase")

const makeFakeResultToken = () => ({
  _id: 1
})

const makeFakeResultLoad = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  confirm: false
})

const makeFakeResultUpdate = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  confirm: true
})

const makeLoadAccountByIdRepository = () => {
  class LoadAccountByIdRepositorySpy {
    async load(id) {
      this.id = id
      return makeFakeResultLoad()
    }
  }

  return new LoadAccountByIdRepositorySpy()
}

const makeConfirmAccountRepository = () => {
  class ConfirmAccountRepositorySpy {
    async update(id, confirm) {
      this.id = id
      this.confirm = confirm
      return makeFakeResultUpdate()
    }
  }

  return new ConfirmAccountRepositorySpy()
}

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    async verify(token) {
      this.token = token
      return makeFakeResultToken()
    }
  }

  return new TokenGeneratorSpy
}

const makeSut = () => {
  const tokenGeneratorSpy = makeTokenGenerator()
  const loadAccountByIdRepositorySpy = makeLoadAccountByIdRepository()
  const confirmAccountRepositorySpy = makeConfirmAccountRepository()
  const sut = new ConfirmAccountUseCase({
    tokenGenerator: tokenGeneratorSpy,
    loadAccountByIdRepository: loadAccountByIdRepositorySpy,
    confirmAccountRepository: confirmAccountRepositorySpy
  })

  return {
    sut,
    tokenGeneratorSpy,
    loadAccountByIdRepositorySpy,
    confirmAccountRepositorySpy,
  }
}

describe('ConfirmAccountUseCase', () => {
  test('Should throw Error if no tokenGenerator is provided', async () => {
    const sut = new ConfirmAccountUseCase({
      loadAccountByIdRepository: makeLoadAccountByIdRepository(),
      confirmAccountRepository: makeConfirmAccountRepository()
    })

    const promise = sut.confirm('any_token')

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if tokenGenerator has no verify method', async () => {
    const sut = new ConfirmAccountUseCase({
      loadAccountByIdRepository: makeLoadAccountByIdRepository(),
      confirmAccountRepository: makeConfirmAccountRepository(),
      tokenGenerator: {}
    })

    const promise = sut.confirm('any_token')

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if no loadAccountByIdRepository is provided', async () => {
    const sut = new ConfirmAccountUseCase({
      confirmAccountRepository: makeConfirmAccountRepository(),
      tokenGenerator: makeTokenGenerator()

    })

    const promise = sut.confirm('any_token')

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if loadAccountByIdRepository has no load method', async () => {
    const sut = new ConfirmAccountUseCase({
      loadAccountByIdRepository: {},
      confirmAccountRepository: makeConfirmAccountRepository(),
      tokenGenerator: makeTokenGenerator()
    })

    const promise = sut.confirm('any_token')

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if no confirmAccountRepository is provided', async () => {
    const sut = new ConfirmAccountUseCase({
      loadAccountByIdRepository: makeLoadAccountByIdRepository(),
      tokenGenerator: makeTokenGenerator()
    })

    const promise = sut.confirm('any_token')

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if confirmAccountRepository has no update method', async () => {
    const sut = new ConfirmAccountUseCase({
      loadAccountByIdRepository: makeLoadAccountByIdRepository(),
      tokenGenerator: makeTokenGenerator()
    })

    const promise = sut.confirm('any_token')

    expect(promise).rejects.toThrow()
  })

  test('Should call TokenGenerator with correct token', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    const verifySpy = jest.spyOn(tokenGeneratorSpy, 'verify')
    
    await sut.confirm('any_token')

    expect(verifySpy).toHaveBeenCalledWith('any_token')
  })

  test('Should call LoadAccountByIdRepository with correct id', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdRepositorySpy, 'load')
    
    await sut.confirm('any_token')

    expect(loadSpy).toHaveBeenCalledWith(makeFakeResultToken()._id)
  })

  test('Should call ConfirmAccountRepository with correct id', async () => {
    const { sut, confirmAccountRepositorySpy } = makeSut()
    const updateSpy = jest.spyOn(confirmAccountRepositorySpy, 'update')
    
    await sut.confirm('any_token')

    expect(updateSpy).toHaveBeenCalledWith(makeFakeResultLoad().id, true)
  })

  test('Should return account updated', async () => {
    const { sut } = makeSut()
    const account = await sut.confirm('any_token')

    expect(account).toEqual(makeFakeResultUpdate())
  })
})