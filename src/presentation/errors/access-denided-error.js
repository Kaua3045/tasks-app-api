module.exports = class AccessDeniedError extends Error {
  constructor() {
    super('Access Denied')
    this.name = 'AccessDeniedError'
  }
}