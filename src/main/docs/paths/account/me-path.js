const mePath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Account'],
    summary: 'API para listar os dados do usuário logado',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/accessToken'
            }
          }
        }
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

module.exports = mePath