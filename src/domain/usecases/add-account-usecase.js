const { MissingParamError } = require('../../utils/errors')

module.exports = class AddAccountUseCase {
  async addAccount({ name, email, password }) {
    if (!name) {
      throw new MissingParamError('name')
    }
    if (!email) {
      throw new MissingParamError('email')
    }
    if(!password) {
      throw new MissingParamError('password')
    }
  }
}