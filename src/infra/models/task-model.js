const { randomUUID } = require('node:crypto')

module.exports = class TaskModel {
  id
  title
  description
  user_id

  constructor(title, description, user_id) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.title = title
    this.description = description
    this.user_id = user_id
  }
}