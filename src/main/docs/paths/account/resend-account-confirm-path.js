const resendAccountConfirmPath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Account'],
    summary: 'API para reenviar o email de confirmação',
    responses: {
      204: {
        description: 'Sucesso sem retorno',
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/accessDenied'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

module.exports = resendAccountConfirmPath