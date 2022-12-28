const { randomUUID } = require('node:crypto')

module.exports = class TaskModel {
  id
  title
  description
  completed
  user_id

  constructor(title, description, user_id, completed) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.title = title
    this.description = description
    this.completed = completed
    this.user_id = user_id
  }
}