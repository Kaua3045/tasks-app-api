module.exports = class AccountHasBeenConfirmedError extends Error {
  constructor() {
    super('Your account has already been confirmed')
    this.name = 'AccountHasBeenConfirmedError'
  }
}