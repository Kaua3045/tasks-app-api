const Encrypter = require("../../../utils/helpers/encrypter")

const makeEncrypter = () => {
  const encrypter = new Encrypter()
  return encrypter
}

module.exports = {
  makeEncrypter
}