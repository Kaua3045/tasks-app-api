const SendMailConfirmAccountUseCase = require("../../../../src/domain/usecases/account/send-mail-confirm-account-usecase")

const makeFakeRequest = () => ({
  email: 'any_email@mail.com',
  name: 'any_name',
  id: 1
})

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    async generateAccessToken(id) {
      this.id = id
      return 'any_token'
    }
  }

  return new TokenGeneratorSpy
}

const makeMailSend = () => {
  class MailSendSpy {
    send(emailToSend, subject, templateName, context) {
      this.emailToSend = emailToSend
      this.subject = subject
      this.templateName = templateName
      this.context = context
    }
  }

  return new MailSendSpy()
}

const makeSut = () => {
  const mailSendSpy = makeMailSend()
  const tokenGeneratorSpy = makeTokenGenerator()
  const sut = new SendMailConfirmAccountUseCase({
    tokenGenerator: tokenGeneratorSpy,
    mailSend: mailSendSpy
  })

  return {
    sut,
    mailSendSpy,
    tokenGeneratorSpy
  }
}

describe('SendMailConfirmAccountUseCase', () => {
  test('Should throw Error if no mailSend is provided', async () => {
    const sut = new SendMailConfirmAccountUseCase({
      tokenGenerator: makeTokenGenerator()
    })

    const promise = sut.sendMailConfirm(makeFakeRequest())

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if mailSend has no send method', async () => {
    const sut = new SendMailConfirmAccountUseCase({
      tokenGenerator: makeTokenGenerator(),
      mailSend: {}
    })

    const promise = sut.sendMailConfirm(makeFakeRequest())

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if no tokenGenerator is provided', async () => {
    const sut = new SendMailConfirmAccountUseCase({
      mailSend: makeMailSend()
    })

    const promise = sut.sendMailConfirm(makeFakeRequest())

    expect(promise).rejects.toThrow()
  })

  test('Should throw Error if tokenGenerator has no generateAccessToken', async () => {
    const sut = new SendMailConfirmAccountUseCase({
      mailSend: makeMailSend(),
      tokenGenerator: {}
    })

    const promise = sut.sendMailConfirm(makeFakeRequest())

    expect(promise).rejects.toThrow()
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    const generateAccessTokenSpy = jest.spyOn(tokenGeneratorSpy, 'generateAccessToken')
    
    await sut.sendMailConfirm(
      makeFakeRequest().email,
      makeFakeRequest().name,
      makeFakeRequest().id
    )

    expect(generateAccessTokenSpy).toHaveBeenCalledWith(makeFakeRequest().id)
  })

  test('Should call MailSend with correct params', async () => {
    const { sut, mailSendSpy } = makeSut()
    const sendSpy = jest.spyOn(mailSendSpy, 'send')

    await sut.sendMailConfirm(
      makeFakeRequest().email,
      makeFakeRequest().name,
      makeFakeRequest().id
    )

    expect(sendSpy).toHaveBeenCalledWith(
      makeFakeRequest().email,
      'Confirm Account',
      'confirm-account-template',
      {
        name: makeFakeRequest().name,
        url: 'http://localhost:8000/api/account/confirm/any_token'
      }
    )
  })
})