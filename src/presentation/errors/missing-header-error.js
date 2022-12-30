module.exports = class MissingHeaderError extends Error {
  constructor(headerName) {
    super(`Missing header: ${headerName}`)
    this.name = 'MissingHeaderError'
  }
}