const listTaskByIdPath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Task'],
    summary: 'API para listar uma task pelo id',
    parameters: [{
      in: 'path',
      name: 'taskId',
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
      403: {
        $ref: '#/components/accessDenied'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

module.exports = listTaskByIdPath