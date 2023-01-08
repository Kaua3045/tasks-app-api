const { MissingParamError, InvalidParamError } = require("../../../../src/utils/errors")
const { ServerError, UnauthorizedError } = require("../../../../src/presentation/errors")
const AuthenticateController = require("../../../../src/presentation/controllers/account/authenticate-controller")

const makeFakeRequest = () => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeFakeResult = () => ({
  accessToken: {
    accessToken: 'any_token'
  }
})

const makeAuthenticateUseCase = () => {
  class AuthenticateUseCaseSpy {
    async auth({ email, password }) {
      this.email = email
      this.password = password
      return makeFakeResult()
    }
  }

  return new AuthenticateUseCaseSpy()
}

const makeEmailValidator = () => {
  class EmailValidator {
    isValid(email) {
      this.email = email
      return true
    }
  }

  return new EmailValidator()
}

const makeSut = () => {
  const authenticateUseCaseSpy = makeAuthenticateUseCase()
  const emailValidatorSpy = makeEmailValidator()
  const sut = new AuthenticateController({
    authenticateUseCase: authenticateUseCaseSpy,
    emailValidator: emailValidatorSpy,
  })

  return {
    sut,
    authenticateUseCaseSpy,
    emailValidatorSpy
  }
}

describe('AuthenticateController', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('email').message)
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('password').message)
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest
      .spyOn(emailValidatorSpy, 'isValid')
      .mockReturnValueOnce(false)
    
    const httpRequest = {
      body: {
        email: 'invalid_email',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new InvalidParamError('email').message)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call AuthenticateUseCase with correct params', async () => {
    const { sut, authenticateUseCaseSpy } = makeSut()
    await sut.handle(makeFakeRequest())

    expect(authenticateUseCaseSpy.email).toBe(makeFakeRequest().body.email)
    expect(authenticateUseCaseSpy.password).toBe(makeFakeRequest().body.password)
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    await sut.handle(makeFakeRequest())

    expect(emailValidatorSpy.email).toBe(makeFakeRequest().body.email)
  })

  test('Should return 401 if the account does not exist or the data does not match', async () => {
    const { sut, authenticateUseCaseSpy } = makeSut()
    jest
      .spyOn(authenticateUseCaseSpy, 'auth')
      .mockReturnValueOnce(null)

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body.error).toBe(new UnauthorizedError().message)
  })

  test('Should return 200 when valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.token).toEqual(makeFakeResult().accessToken)
  })

  test('Should throw ServerError if invalid dependencies are provided', async () => {
    const invalid = {}
    const authenticateUseCase = makeAuthenticateUseCase()
    const suts = [].concat(
      new AuthenticateController(),
      new AuthenticateController({}),
      new AuthenticateController({
        authenticateUseCase: invalid
      }),
      new AuthenticateController({
        authenticateUseCase
      }),
      new AuthenticateController({
        authenticateUseCase,
        emailValidator: invalid
      })
    )

    for (const sut of suts) {
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toBe(new ServerError().message)
    }
  })
})