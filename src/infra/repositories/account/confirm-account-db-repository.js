const AccountDbModel = require('../../database/sequelize/models/account-database-model')

module.exports = class confirmAccountDbRepository {
  async update(id, confirmed) {
    const account = await AccountDbModel
      .update({ confirm: confirmed }, { where: { id }, returning: true })
    return account[1]
  }
}