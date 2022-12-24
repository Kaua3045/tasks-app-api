const { MissingParamError } = require('../../utils/errors')

module.exports = class AddAccountUseCase {
  constructor({ loadUserByEmailRepository } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

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

    const user = await this.loadUserByEmailRepository.load(email)
    if (!user) {
      // LOGIC
    }

    return null
  }
}