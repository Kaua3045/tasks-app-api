module.exports = class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
    this.name = 'UserNotFOund'
  }
}