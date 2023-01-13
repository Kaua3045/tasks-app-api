const updateTaskBodySchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    completed: {
      type: 'boolean',
      default: false
    }
  },
}

module.exports = updateTaskBodySchema