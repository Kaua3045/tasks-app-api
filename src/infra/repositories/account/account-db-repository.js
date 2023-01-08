const AccountModel = require('../../models/account-model')
const AccountDbModel = require('../../database/sequelize/models/account-database-model')

module.exports = class AccountDbRepository {
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

  async loadByEmail(email, withoutPassword = true) {
    if (withoutPassword) {
      const account = await AccountDbModel
        .scope('withoutPassword')
        .findOne({ where: { email: email }})

      return account
    }

    const account = await AccountDbModel.findOne({ where: { email: email }})
    return account
  }

  async loadById(id) {
    const account = await AccountDbModel.scope('withoutPassword').findOne({ where: { id: id }})
    return account
  }

  async update(id, confirmed) {
    const account = await AccountDbModel
      .update({ confirm: confirmed }, { where: { id }, returning: true })
    return account[1]
  }
}