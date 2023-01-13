const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  keyGenerator(req) {
    return req.ip
  },
  message: { error: 'Too many requests to the endpoints' }
})

module.exports = limiter