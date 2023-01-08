const { UserNotFoundError } = require("../../../domain/errors")
const { AccessDenidedError, ServerError, AccountHasBeenConfirmedError } = require("../../errors")
const SendOtherMailConfirmAccountController = require("./send-other-mail-confirm-account-controller")

const makeFakeRequest = () => ({
  headers: {
    authorization: 'Bearer any_token'
  }
})

const makeFakeResult = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  confirm: false
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

const makeSendMailConfirmAccountUseCase = () => {
  class sendMailConfirmAccountUseCaseSpy {
    async sendMailConfirm(email, name, id) {
      this.email = email
      this.name = name
      this.id = id
    }
  }

  return new sendMailConfirmAccountUseCaseSpy()
}

const makeSut = () => {
  const meAccountUseCaseSpy = makeMeAccountUseCase()
  const sendMailConfirmAccountUseCaseSpy = makeSendMailConfirmAccountUseCase()
  const sut = new SendOtherMailConfirmAccountController({
    meAccountUseCase: meAccountUseCaseSpy,
    sendMailConfirmAccountUseCase: sendMailConfirmAccountUseCaseSpy
  })

  return {
    sut,
    meAccountUseCaseSpy,
    sendMailConfirmAccountUseCaseSpy
  }
}

describe('SendOtherMailConfirmAccount', () => {
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

  test('Should return 400 if MeAccountUseCase return null', async () => {
    const { sut, meAccountUseCaseSpy } = makeSut()
    jest
      .spyOn(meAccountUseCaseSpy, 'meAccount')
      .mockReturnValueOnce(null)

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new UserNotFoundError().message)
  })

  test('Should return 400 if Account return confirm true', async () => {
    const { sut, meAccountUseCaseSpy } = makeSut()
    jest
      .spyOn(meAccountUseCaseSpy, 'meAccount')
      .mockReturnValueOnce({
        id: 1,
        name: 'any_name',
        email: 'any_email@mail.com',
        confirm: true
      })

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new AccountHasBeenConfirmedError().message)
  })

  test('Should return 204 if Email send', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(204)
  })

  test('Should throw ServerError if invalid dependencies are provided', async () => {
    const suts = [].concat(
      new SendOtherMailConfirmAccountController(),
      new SendOtherMailConfirmAccountController({}),
      new SendOtherMailConfirmAccountController({
        meAccountUseCase: makeMeAccountUseCase()
      }),
      new SendOtherMailConfirmAccountController({
        sendMailConfirmAccountUseCase: makeSendMailConfirmAccountUseCase()
      }),
    )

    for (const sut of suts) {
      const httpReponse = await sut.handle(makeFakeRequest())
      expect(httpReponse.statusCode).toBe(500)
      expect(httpReponse.body.error).toBe(new ServerError().message)
    }
  })
})