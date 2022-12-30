const AccountDbModel = require("../../database/sequelize/models/account-database-model")

module.exports = class LoadAccountByIdDbRepository {
  async load(id) {
    const account = await AccountDbModel.findOne({ where: { id: id }})
    return account
  }
}