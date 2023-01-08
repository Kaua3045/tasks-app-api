jest.mock('jsonwebtoken', () => ({
  token: 'any_token',

  async sign(payload, secret, expiresIn) {
    this.payload = payload
    this.secret = secret
    this.expiresIn = expiresIn
    return this.token
  },

  async verify() {
    return 'any_value'
  }
}))

const jwt = require('jsonwebtoken')
const { MissingParamError } = require('../../../src/utils/errors')
const TokenGenerator = require("../../../src/utils/helpers/token-generator")

const userId = '7463c662-d6ef-45ec-9257-f5eb343ab02d'
const token = 'any_token'

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

  describe('verify()', () => {
    test('Should throw MissingParamError if no Secret is provided', () => {
      const sut = new TokenGenerator()
      const promise = sut.verify(token)

      expect(promise).rejects.toThrow(new MissingParamError('secret'))
    })

    test('Should throw MissingParamError if no ExpiresTime is provided', () => {
      const sut = new TokenGenerator('secret')
      const promise = sut.verify(token)

      expect(promise).rejects.toThrow(new MissingParamError('expiresTime'))
    })

    test('Should throw MissingParamError if no token is provided', async () => {
      const sut = makeSut() 
      const promise = sut.verify()

      expect(promise).rejects.toThrow(new MissingParamError('token'))
    })

    test('Should return a value on verify success', async () => {
      const sut = makeSut()
      const value = await sut.verify(token)
      
      expect(value).toBe('any_value')
    })

    test('Should call JWT verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.verify(token)
      
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    test('Should return null if verify returns throw or null', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(new Error())
      const promise = await sut.verify(token)

      expect(promise).toBeNull()
    })
  })
})