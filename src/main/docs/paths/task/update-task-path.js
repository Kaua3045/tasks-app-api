const updateTaskPath = {
  patch: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Task'],
    summary: 'API para atualizar uma task do usuário',
    parameters: [{
      in: 'path',
      name: 'taskId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateTaskBody'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/updateTaskResponse'
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

module.exports = updateTaskPath