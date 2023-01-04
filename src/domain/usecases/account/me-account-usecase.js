module.exports = class MeAccountUseCase {
  constructor({ tokenGenerator, loadAccountByIdRepository } = {}){
    this.tokenGenerator = tokenGenerator
    this.loadAccountByIdRepository = loadAccountByIdRepository
  }

  async meAccount(accessToken) {
    const tokenVerified = await this.tokenGenerator.verify(accessToken)

    if (!tokenVerified) {
      return null
    }

    const account = await this.loadAccountByIdRepository.load(tokenVerified._id)

    if (!account) {
      return null
    }

    return account
  }
}