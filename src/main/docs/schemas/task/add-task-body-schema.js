const addTaskBodySchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    user_id: {
      type: 'string'
    }
  },
  required: ['title', 'description', 'user_id']
}

module.exports = addTaskBodySchema