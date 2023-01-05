const listTasksByUserIdPath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Task'],
    summary: 'API para listar todas as tasks do usuário',
    parameters: [{
      in: 'path',
      name: 'userId',
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
              $ref: '#/schemas/listTasksByUserIdResponse'
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

module.exports = listTasksByUserIdPath