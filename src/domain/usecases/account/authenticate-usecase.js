module.exports = class AuthenticateUseCase {
  constructor({ loadAccountByEmailRepository, encrypter, tokenGenerator } = {}) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async auth({ email, password }) {
    const account = await this.loadAccountByEmailRepository.load(email)

    if (!account) {
      return null
    }

    const comparePassword = await this.encrypter.compare(password, account.password)

    if (!comparePassword) {
      return null
    }

    const accessToken = await this.tokenGenerator.generateAccessToken(account.id)

    return {
      accessToken
    }
  }
}