module.exports = class JwtTokenError extends Error {
  constructor() {
    super('Jwt invalid format or expired')
    this.name = 'JwtMalformedError'
  }
}