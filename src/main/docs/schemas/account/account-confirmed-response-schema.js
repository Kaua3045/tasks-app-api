const accountConfirmedResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    confirm: {
      type: 'boolean',
      default: false
    }
  }
}

module.exports = accountConfirmedResponseSchema