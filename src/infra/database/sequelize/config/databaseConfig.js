const envConfig = require('../../../../main/config/env')

module.exports = {
  dialect: 'postgres',
  host: envConfig.databaseConfig.host,
  port: envConfig.databaseConfig.port,
  username: envConfig.databaseConfig.username,
  password: envConfig.databaseConfig.password,
  database: envConfig.databaseConfig.database,
}