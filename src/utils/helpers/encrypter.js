const bcrypt = require('bcrypt')
const { MissingParamError } = require('../errors')

module.exports = class Encrypter {
  async generate(value) {
    if (!value) {
      throw new MissingParamError('value')
    }

    const hash = await bcrypt.hash(value, 8)
    return hash
  }

  async compare(value, hash) {
    if (!value) {
      throw new MissingParamError('value')
    }
    if (!hash) {
      throw new MissingParamError('hash')
    }

    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}