module.exports = class JwtTokenError extends Error {
  constructor() {
    super('Jwt invalid')
    this.name = 'JwtMalformedError'
  }
}