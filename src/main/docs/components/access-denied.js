const accessDenied = {
  description: 'Acesso negado',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}

module.exports = accessDenied