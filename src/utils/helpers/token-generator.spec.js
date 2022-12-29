jest.mock('jsonwebtoken', () => ({
  token: 'any_token',

  sign(payload, secret, expiresIn) {
    this.payload = payload
    this.secret = secret
    this.expiresIn = expiresIn
    return this.token
  }
}))

const jwt = require('jsonwebtoken')
const { MissingParamError } = require('../errors')
const TokenGenerator = require("./token-generator")

const userId = '7463c662-d6ef-45ec-9257-f5eb343ab02d'

const makeSut = () => {
  return new TokenGenerator('secret', '60m')
}

describe('TokenGenerator', () => {
  describe('generateAccessToken()', () => {
    test('Should throw MissingParamError if no Secret is provided', () => {
      const sut = new TokenGenerator()
      const promise = sut.generateAccessToken(userId)

      expect(promise).rejects.toThrow(new MissingParamError('secret'))
    })

    test('Should throw MissingParamError if no ExpiresTime is provided', () => {
      const sut = new TokenGenerator('secret')
      const promise = sut.generateAccessToken(userId)

      expect(promise).rejects.toThrow(new MissingParamError('expiresTime'))
    })

    test('Should throw MissingParamError if no id is provided', async () => {
      const sut = makeSut()
      const promise = sut.generateAccessToken()

      expect(promise).rejects.toThrow(new MissingParamError('id'))
    })

    test('Should return null if JWT returns null', async () => {
      const sut = makeSut()
      jwt.token = null
      const token = await sut.generateAccessToken(userId)

      expect(token).toBeNull()
    })

    test('Should return a token if JWT returns token', async () => {
      const sut = makeSut()
      const token = await sut.generateAccessToken(userId)

      expect(token).toBe(jwt.token)
    })

    test('Should call JWT sign with correct values', async () => {
      const sut = makeSut()
      await sut.generateAccessToken(userId)
      
      expect(jwt.payload).toEqual({
        _id: userId
      })
      expect(jwt.secret).toBe(sut.secret)
      expect(jwt.expiresIn).toEqual({
        expiresIn: sut.expiresTime
      })
    })
  })
})