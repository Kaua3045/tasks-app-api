const { 
  authPath, 
  mePath, 
  addAccountPath, 
  addTaskPath, 
  listTaskByIdPath, 
  listTasksByUserIdPath,
  updateTaskPath,
  deleteTaskPath,
  confirmAccountPath,
  resendAccountConfirmPath
} = require('./paths')

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
  listTaskByIdResponseSchema,
  listTasksByUserIdResponseSchema,
  updateTaskBodySchema,
  updateTaskResponseSchema,
  accountConfirmedResponseSchema
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
    '/account/confirm/{tokenConfirm}': confirmAccountPath,
    '/account/confirm/resend': resendAccountConfirmPath,
    '/task/create': addTaskPath,
    '/task/{taskId}': listTaskByIdPath,
    '/task/all/{userId}': listTasksByUserIdPath,
    '/task/update/{taskId}': updateTaskPath,
    '/task/delete/{taskId}': deleteTaskPath
  },
  schemas: {
    accessToken: accessTokenSchema,
    authBody: authBodySchema,
    meAccount: meAccountSchema,
    addAccountBody: addAccountBodySchema,
    addAccountResponse: addAccountResponseSchema,
    accountConfirmedResponse: accountConfirmedResponseSchema,
    addTaskBody: addTaskBodySchema,
    addTaskResponse: addTaskResponseSchema,
    listTaskByIdResponse: listTaskByIdResponseSchema,
    listTasksByUserIdResponse: listTasksByUserIdResponseSchema,
    updateTaskBody: updateTaskBodySchema,
    updateTaskResponse: updateTaskResponseSchema,
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