const AccountDbModel = require("../../database/sequelize/models/account-database-model")

module.exports = class LoadAccountByEmailDbRepository {
  constructor(withoutPassword) {
    this.withoutPassword = withoutPassword
  }

  async load(email) {
    if (this.withoutPassword) {
      const account = await AccountDbModel.scope('withoutPassword').findOne({ where: { email: email }})
      return account
    }

    const account = await AccountDbModel.findOne({ where: { email: email }})
    return account
  }
}