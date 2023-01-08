const Encrypter = require("../../../src/utils/helpers/encrypter")
const bcrypt = require('bcrypt')
const { MissingParamError } = require("../../../src/utils/errors")

jest.mock('bcrypt', () => ({
  isValid: true,

  async hash() {
    return 'hash'
  },

  async compare(value, hash) {
    this.value = value
    this.hash = hash
    return this.isValid
  }
}))

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  describe('generate()', () => {
    test('Should call with correct value', async () => {
      const sut = makeSut()
      const generateHashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.generate('any_value')
      
      expect(generateHashSpy).toHaveBeenCalledWith('any_value', 8)
    })

    test('Should return a valid hash on hash sucess', async () => {
      const sut = makeSut()
      const hashed = await sut.generate('any_value')
     
      expect(hashed).toBe('hash')
    })

    test('Should throw MissingParamError if no value is provided', async () => {
      const sut = makeSut()
      const promise = sut.generate()

      expect(promise).rejects.toThrow(new MissingParamError('value'))
    })
  })

  describe('compare()', () => {
    test('Should throw MissingParamError if no params are provided', async () => {
      const sut = makeSut()

      expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
      expect(sut.compare('any_value')).rejects.toThrow(new MissingParamError('hash'))
    })

    test('Should call Bcrypt with correct values', async () => {
      const sut = makeSut()
      await sut.compare('any_value', 'hashed_value')

      expect(bcrypt.value).toBe('any_value')
      expect(bcrypt.hash).toBe('hashed_value')
    })

    test('Should return true if Bcrypt returns true', async () => {
      const sut = makeSut()
      const isValid = await sut.compare('any_value', 'hashed_value')

      expect(isValid).toBe(true)
    })
    
    test('Should return false if Bcrypt returns false', async () => {
      const sut = makeSut()
      bcrypt.isValid = false
      const isValid = await sut.compare('any_value', 'hashed_value')

      expect(isValid).toBe(false)
    })

  })
})