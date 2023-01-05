const { authPath, mePath, addAccountPath, addTaskPath, listTaskByIdPath } = require('./paths')

const { 
  badRequest, 
  unauthorized, 
  serverError, 
  accessDenied 
} = require('./components')

const { 
  accessTokenSchema, 
  authBodySchema,
  meAccountSchema,
  errorSchema,
  addAccountBodySchema,
  addAccountResponseSchema,
  addTaskBodySchema,
  addTaskResponseSchema,
  listTaskByIdResponseSchema
} = require('./schemas')

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
    name: 'Account',
    name: 'Task'
  }],
  paths: {
    '/account/create': addAccountPath,
    '/account/auth': authPath,
    '/account/me': mePath,
    '/task/create': addTaskPath,
    '/task/{id}': listTaskByIdPath
  },
  schemas: {
    accessToken: accessTokenSchema,
    authBody: authBodySchema,
    meAccount: meAccountSchema,
    addAccountBody: addAccountBodySchema,
    addAccountResponse: addAccountResponseSchema,
    addTaskBody: addTaskBodySchema,
    addTaskResponse: addTaskResponseSchema,
    listTaskByIdResponse: listTaskByIdResponseSchema,
    error: errorSchema
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    badRequest,
    unauthorized,
    serverError,
    accessDenied
  }
}