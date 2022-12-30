const jwt = require('jsonwebtoken')
const { MissingParamError } = require('../errors')

module.exports = class TokenGenerator {
  constructor(secret, expiresTime) {
    this.secret = secret
    this.expiresTime = expiresTime
  }

  async generateAccessToken(id) {
    if (!this.secret) {
      throw new MissingParamError('secret')
    }
    if (!this.expiresTime) {
      throw new MissingParamError('expiresTime')
    }
    if (!id) {
      throw new MissingParamError('id')
    }

    return await jwt.sign({ _id: id }, this.secret, {
      expiresIn: this.expiresTime
    })
  }

  async verify(token) {
    if (!this.secret) {
      throw new MissingParamError('secret')
    }
    if (!this.expiresTime) {
      throw new MissingParamError('expiresTime')
    }
    if (!token) {
      throw new MissingParamError('token')
    }

    return await jwt.verify(token, this.secret)
  } 
}