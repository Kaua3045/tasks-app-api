const authPath = {
  post: {
    tags: ['Login'],
    summary: 'API para autenticar o usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/authBody'
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
              $ref: '#/schemas/accessToken'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

module.exports = authPath