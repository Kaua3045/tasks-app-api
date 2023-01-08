const { makeTokenGenerator } = require('./token-generator-factory')
const { makeEncrypter } = require('./encrypter-factory')
const { makeEmailValidator } = require('./email-validator-factory')
const { makeMailSend } = require('./mail-send-factory')

module.exports = {
  makeTokenGenerator,
  makeEncrypter,
  makeEmailValidator,
  makeMailSend
}