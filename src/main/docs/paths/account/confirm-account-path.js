const confirmAccountPath = {
  patch: {
    tags: ['Account'],
    summary: 'API para confirmar uma conta recem criada',
    parameters: [{
      in: 'path',
      name: 'tokenConfirm',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/accountConfirmedResponse'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

module.exports = confirmAccountPath