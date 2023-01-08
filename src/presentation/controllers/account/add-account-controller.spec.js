const { UserAlreadyExistsError } = require("../../../domain/errors")
const { MissingParamError, InvalidParamError } = require("../../../utils/errors")
const { ServerError } = require("../../errors")
const AddAccountController = require("./add-account-controller")

const makeFakeRequest = () => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeFakeResult = () => ({
  userCreated: {
    id: 1,
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeAddAccountUseCase = () => {
  class AddAccountUseCaseSpy {
    async addAccount({ name, email, password }) {
      this.name = name
      this.email = email
      this.password = password
      
      return makeFakeResult()
    }
  }

  return new AddAccountUseCaseSpy()
}

const makeEmailValidator = () => {
  class EmailValidatorSpy {
    isValid(email) {
      this.email = email
      return true
    }
  }

  return new EmailValidatorSpy()
}

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    generateAccessToken(id) {
      this.id = id
      return 'any_token'
    }
  }

  return new TokenGeneratorSpy()
}

const makeSendMailConfirmation = () => {
  class sendMailConfirmationSpy {
    sendMailConfirm(email, name, id) {
      this.email = email
      this.name = name
      this.id = id
    }
  }

  return new sendMailConfirmationSpy()
}

const makeSut = () => {
  const addAccountUseCaseSpy = makeAddAccountUseCase()
  const emailValidatorSpy = makeEmailValidator()
  const tokenGeneratorSpy = makeTokenGenerator()
  const sendMailConfirmAccountUseCaseSpy = makeSendMailConfirmation()
  const sut = new AddAccountController({
    addAccountUseCase: addAccountUseCaseSpy,
    emailValidator: emailValidatorSpy,
    tokenGenerator: tokenGeneratorSpy,
    sendMailConfirmAccountUseCase: sendMailConfirmAccountUseCaseSpy
  })

  return {
    sut,
    addAccountUseCaseSpy,
    emailValidatorSpy,
    tokenGeneratorSpy,
    sendMailConfirmAccountUseCaseSpy
  }
}

describe('AddAccountController', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('name').message)
  })
  
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
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
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }
    
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('password').message)
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

  test('Should call AddAccountUseCase with correct params', async () => {
    const { sut, addAccountUseCaseSpy } = makeSut()
    await sut.handle(makeFakeRequest())
    
    expect(addAccountUseCaseSpy.name).toBe(makeFakeRequest().body.name)
    expect(addAccountUseCaseSpy.email).toBe(makeFakeRequest().body.email)
    expect(addAccountUseCaseSpy.password).toBe(makeFakeRequest().body.password)
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    await sut.handle(makeFakeRequest())

    expect(emailValidatorSpy.email).toBe(makeFakeRequest().body.email)
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    await sut.handle(makeFakeRequest())

    expect(tokenGeneratorSpy.id).toBe(makeFakeResult().userCreated.id)
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest
      .spyOn(emailValidatorSpy, 'isValid')
      .mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new InvalidParamError('email').message)
  })

  test('Should return 400 if an account with that email already exists', async () => {
    const { sut, addAccountUseCaseSpy } = makeSut()
    jest
      .spyOn(addAccountUseCaseSpy, 'addAccount')
      .mockReturnValueOnce(false)

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new UserAlreadyExistsError().message)
  })

  test('Should return 200 when account was created', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.account).toEqual(makeFakeResult().userCreated)
  })

  test('Should throw ServerError if invalid dependencies are provided', async () => {
    const invalid = {}
    const addAccountUseCase = makeAddAccountUseCase()
    const suts = [].concat(
      new AddAccountController(),
      new AddAccountController({}),
      new AddAccountController({
        addAccountUseCase: invalid
      }),
      new AddAccountController({
        addAccountUseCase
      }),
      new AddAccountController({
        addAccountUseCase,
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