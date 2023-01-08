const TokenGenerator = require("../../../utils/helpers/token-generator")

const makeTokenGenerator = () => {
  const tokenGenerator = new TokenGenerator(process.env.JWT_SECRET, process.env.JWT_EXPIRESIN)
  return tokenGenerator
}

module.exports = {
  makeTokenGenerator
}