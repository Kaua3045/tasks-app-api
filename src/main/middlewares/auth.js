const { adaptMiddleware } = require('../adapters/express-middleware-adapter')
const { makeAuthenticateMiddleware } = require('../factory/middlewares/auth-middleware-impl')

const auth = adaptMiddleware(makeAuthenticateMiddleware())

module.exports = auth