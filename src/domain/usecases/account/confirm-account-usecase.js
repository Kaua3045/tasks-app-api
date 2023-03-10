module.exports = class ConfirmAccountUseCase {
  constructor({ tokenGenerator, loadAccountByIdRepository, confirmAccountRepository } = {}) {
    this.tokenGenerator = tokenGenerator
    this.loadAccountByIdRepository = loadAccountByIdRepository
    this.confirmAccountRepository = confirmAccountRepository
  }

  async confirm(token) {
    const tokenVerified = await this.tokenGenerator.verify(token)
    
    if (!tokenVerified) {
      return null
    }

    const accountLoad = await this.loadAccountByIdRepository.loadById(tokenVerified._id)

    if (!accountLoad) {
      return null
    }

    const account = await this.confirmAccountRepository.update(accountLoad.id, true)

    return account
  }
}