const Encrypter = require("./encrypter")
const bcrypt = require('bcrypt')
const { MissingParamError } = require("../errors")

jest.mock('bcrypt', () => ({
  async hash() {
    return 'hash'
  }
}))

describe('Encrypter', () => {
  describe('generate()', () => {
    test('Should call with correct value', async () => {
      const sut = new Encrypter()
      const generateHashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.generate('any_value')
      
      expect(generateHashSpy).toHaveBeenCalledWith('any_value', 8)
    })

    test('Should return a valid hash on hash sucess', async () => {
      const sut = new Encrypter()
      const hashed = await sut.generate('any_value')
     
      expect(hashed).toBe('hash')
    })

    test('Should throw if no value is provided', async () => {
      const sut = new Encrypter()
      const promise = sut.generate()

      expect(promise).rejects.toThrow(new MissingParamError('value'))
    })
  })
})