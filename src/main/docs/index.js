const { authPath } = require('./paths')

const { badRequest, unauthorized, serverError } = require('./components')

const { accessTokenSchema, authBodySchema, errorSchema } = require('./schemas')

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'TaskApp API',
    description: 'API para criação de tasks',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/auth': authPath
  },
  schemas: {
    accessToken: accessTokenSchema,
    authBody: authBodySchema,
    error: errorSchema
  },
  components: {
    badRequest,
    unauthorized,
    serverError
  }
}