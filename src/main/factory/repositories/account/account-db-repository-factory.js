const AccountDbRepository = require("../../../../infra/repositories/account/account-db-repository")

const makeAccountDbRepository = () => {
  const accountDbRepository = new AccountDbRepository()
  return accountDbRepository
}

module.exports = {
  makeAccountDbRepository
}