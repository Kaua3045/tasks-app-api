const AuthMiddleware = require("../../../presentation/middlewares/auth-middleware")

const { makeTokenGenerator } = require('../utils')

const makeAuthenticateMiddleware = () => {  
  return new AuthMiddleware({
    tokenGenerator: makeTokenGenerator()
  })
}

module.exports = {
  makeAuthenticateMiddleware
}