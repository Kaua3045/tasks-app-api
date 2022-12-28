jest.mock('validator', () => ({
  isEmailValid: true,

  isEmail(email) {
    this.email = email
    return this.isEmailValid
  }
}))

const validator = require('validator')
const { MissingParamError } = require('../errors')
const EmailValidator = require('./email-validator')

describe('EmailValidator', () => {
  test('Should return true if validator returns true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@mail.com')

    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator returns false', () => {
    validator.isEmailValid = false
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@mail.com')

    expect(isEmailValid).toBe(false)
  })

  test('Should call validator with correct email', () => {
    const sut = new EmailValidator()
    sut.isValid('any_email@mail.com')

    expect(validator.email).toBe('any_email@mail.com')
  })

  test('Should throw MissingParamError if no email is provided', async () => {
    const sut = new EmailValidator()
    
    expect(() => { sut.isValid() }).toThrow(new MissingParamError('email'))
  })
})