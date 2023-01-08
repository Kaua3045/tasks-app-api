const EmailValidator = require("../../../utils/helpers/email-validator")

const makeEmailValidator = () => {
  const emailValidator = new EmailValidator()
  return emailValidator
}

module.exports = {
  makeEmailValidator
}