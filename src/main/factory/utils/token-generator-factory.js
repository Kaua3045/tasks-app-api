const TokenGenerator = require("../../../utils/helpers/token-generator")
const envConfig = require('../../config/env')

const makeTokenGenerator = () => {
  const tokenGenerator = new TokenGenerator(envConfig.jwtConfig.secret, envConfig.jwtConfig.expiresIn)
  return tokenGenerator
}

module.exports = {
  makeTokenGenerator
}