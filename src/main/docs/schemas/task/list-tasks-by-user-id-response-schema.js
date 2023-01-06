const listTasksByUserIdResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    completed: {
      type: 'boolean',
      default: false
    },
    user_id: {
      type: 'string'
    }
  }
}

module.exports = listTasksByUserIdResponseSchema