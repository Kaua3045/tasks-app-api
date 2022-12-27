module.exports = class InvalidParamError extends Error {
  constructor(paramName) {
    super(`Invalid Param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}