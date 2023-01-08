const { UserNotFoundError } = require('../../../domain/errors')
const { AccessDenidedError, ServerError } = require('../../errors')
const MeAccountController = require('./me-account-controller')

const makeFakeResult = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com'
})

const makeFakeRequest = () => ({
  headers: {
    authorization: 'Bearer any_token'
  }
})

const makeMeAccountUseCase = () => {
  class meAccountUseCaseSpy {
    async meAccount(accessToken) {
      this.accessToken = accessToken
      return makeFakeResult()
    }
  }

  return new meAccountUseCaseSpy()
}

const makeSut = () => {
  const meAccountUseCaseSpy = makeMeAccountUseCase()

  const sut = new MeAccountController({
    meAccountUseCase: meAccountUseCaseSpy
  })

  return {
    sut,
    meAccountUseCaseSpy
  }
}

describe('MeAccountController', () => {
  test('Should return 403 if no token is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        authorization: ''
      }
    }

    const httpResponse = await sut.handle(httpRequest)
   
    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.body.error).toBe(new AccessDenidedError().message)
  })

  test('Should return 400 if account not exists', async () => {
    const { sut, meAccountUseCaseSpy } = makeSut()
    jest
      .spyOn(meAccountUseCaseSpy, 'meAccount')
      .mockReturnValueOnce(null)

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new UserNotFoundError().message)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if httpRequest has no header', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call MeAccountUseCase with correct accessToken', async () => {
    const { sut, meAccountUseCaseSpy } = makeSut()
    await sut.handle(makeFakeRequest())

    expect(meAccountUseCaseSpy.accessToken).toBe('any_token')
  })

  test('Should return 200 when valid accessToken is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.account).toEqual(makeFakeResult())
  })

  test('Should throw ServerError if invalid dependencies are provided', async () => {
    const suts = [].concat(
      new MeAccountController(),
      new MeAccountController({})
    )

    for (const sut of suts) {
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toBe(new ServerError().message)
    }
  })
})