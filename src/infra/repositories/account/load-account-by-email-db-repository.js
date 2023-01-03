const AccountDbModel = require("../../database/sequelize/models/account-database-model")

module.exports = class LoadAccountByEmailDbRepository {
  async load(email) {
    const account = await AccountDbModel.scope('withoutPassword').findOne({ where: { email: email }})
    return account
  }
}