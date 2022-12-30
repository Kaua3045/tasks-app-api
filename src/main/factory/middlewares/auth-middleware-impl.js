const AuthMiddleware = require("../../../presentation/middlewares/auth-middleware")
const TokenGenerator = require("../../../utils/helpers/token-generator")

const makeAuthenticateMiddleware = () => {
  const tokenGenerator = new TokenGenerator(process.env.JWT_SECRET, '60m')
  
  return new AuthMiddleware({
    tokenGenerator
  })
}

module.exports = {
  makeAuthenticateMiddleware
}