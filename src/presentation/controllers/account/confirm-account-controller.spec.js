const ConfirmAccountController = require('./confirm-account-controller')
const { MissingParamError } = require("../../../utils/errors")
const { UserNotFoundError } = require('../../../domain/errors')
const { ServerError } = require('../../errors')

const makeFakeRequest = () => ({
  params: {
    token: 'any_token'
  }
})

const makeFakeResult = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  confirm: true
})

const makeResultConfirmAccount = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  confirm: true
})

const makeConfirmAccountUseCase = () => {
  class ConfirmAccountUseCaseSpy {
    async confirm(token) {
      this.token = token
      return makeResultConfirmAccount()
    }
  }

  return new ConfirmAccountUseCaseSpy()
}

const makeSut = () => {
  const confirmAccountUseCaseSpy = makeConfirmAccountUseCase()
  const sut = new ConfirmAccountController({
    confirmAccountUseCase: confirmAccountUseCaseSpy
  })

  return {
    sut,
    confirmAccountUseCaseSpy
  }
}

describe('ConfirmAccountController', () => {
  test('Should return 400 if no token is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        token: ''
      }
    }

    const httpResponse = await sut.handle(httpRequest)
   
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('token').message)
  })

  test('Should return 400 if account not exists', async () => {
    const { sut, confirmAccountUseCaseSpy } = makeSut()
    jest.spyOn(confirmAccountUseCaseSpy, 'confirm').mockReturnValueOnce(null)

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

  test('Should return 500 if httpRequest has no params', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call ConfirmAccountUseCase with correct token', async () => {
    const { sut, confirmAccountUseCaseSpy } = makeSut()
    await sut.handle(makeFakeRequest())

    expect(confirmAccountUseCaseSpy.token).toBe('any_token')
  })

  test('Should return 200 when valid token', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.account).toEqual(makeFakeResult())
  })

  test('Should throw ServerError if invalid dependencies are provided', async () => {
    const suts = [].concat(
      new ConfirmAccountController(),
      new ConfirmAccountController({})
    )

    for (const sut of suts) {
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toBe(new ServerError().message)
    }
  })
})