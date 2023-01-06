const deleteTaskPath = {
  delete: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Task'],
    summary: 'API para deletar uma task do usuário',
    parameters: [{
      in: 'path',
      name: 'taskId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
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

module.exports = deleteTaskPath