const { MissingParamError } = require('../../utils/errors')
const { UserAlreadyExistsError } = require('../errors')

module.exports = class AddAccountUseCase {
  constructor({ loadUserByEmailRepository, encrypter } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
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
    if (user) {
      throw new UserAlreadyExistsError()
    }
    
    const hashedPassword = await this.encrypter.generate(password)
    
    return { user: 'user' }
  }
}