const addTaskPath = {
  post: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Task'],
    summary: 'API para cadastrar uma task',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addTaskBody'
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
              $ref: '#/schemas/addTaskResponse'
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

module.exports = addTaskPath