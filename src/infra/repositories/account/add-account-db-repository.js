const AccountModel = require('../../models/account-model')
const AccountDbModel = require('../../database/sequelize/models/account-database-model')

module.exports = class AddAccountDbRepository {
  async saveAccount(name, email, password) {
    const account = new AccountModel(name, email, password)
    const accountCreated = await AccountDbModel.create({
      id: account.id,
      name: account.name,
      email: account.email,
      password: account.password
    })

    return accountCreated
  }
}