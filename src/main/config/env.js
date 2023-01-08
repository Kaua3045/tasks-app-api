module.exports = {
  databaseConfig: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'app'
  },
  redisConfig: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET || '812yh3ua9e1wyh30qf3eo0pij12',
    expiresIn: process.env.JWT_EXPIRESIN || '60m'
  },
  mailConfig: {
    host: process.env.MAIL_HOST || 'localhost',
    port: process.env.MAIL_PORT || 2525,
    user: process.env.MAIL_USER || 'fakeuser',
    password: process.env.MAIL_PASSWORD || 'fakepassword'
  }
}