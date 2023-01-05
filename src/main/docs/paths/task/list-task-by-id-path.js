const listTaskByIdPath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Task'],
    summary: 'API para listar uma task pelo id',
    parameters: [{
      in: 'path',
      name: 'id',
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
              $ref: '#/schemas/listTaskByIdResponse'
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

module.exports = listTaskByIdPath