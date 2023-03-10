const addAccountResponseSchema = {
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
    },
    token: {
      type: 'string'
    }
  }
}

module.exports = addAccountResponseSchema