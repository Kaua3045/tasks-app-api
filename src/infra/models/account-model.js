const { randomUUID } = require('node:crypto')

module.exports = class AccountModel {
  id
  name
  email
  password

  constructor(name, email, password) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.name = name
    this.email = email
    this.password = password
  }
}