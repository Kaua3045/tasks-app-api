const envConfig = require('./env')

module.exports = {
  host: envConfig.mailConfig.host,
  port: envConfig.mailConfig.port,
  user: envConfig.mailConfig.user,
  password: envConfig.mailConfig.password
}