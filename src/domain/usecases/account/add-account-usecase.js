module.exports = class AddAccountUseCase {
  constructor({ loadUserByEmailRepository, encrypter, addAccountRepository } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async addAccount({ name, email, password }) {
    const user = await this.loadUserByEmailRepository.loadByEmail(email)
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