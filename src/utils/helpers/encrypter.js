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
}