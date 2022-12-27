const { MissingParamError } = require('../../utils/errors')

module.exports = class AddAccountUseCase {
  constructor({ loadUserByEmailRepository, encrypter, addAccountRepository } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
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
      return false
    }
    
    const hashedPassword = await this.encrypter.generate(password)
    const userCreated = await this.addAccountRepository.saveAccount(name, email, hashedPassword)

    return {
      userCreated
    }
  }
}