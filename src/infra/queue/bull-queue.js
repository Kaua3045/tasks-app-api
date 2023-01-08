const Queue = require('bull')
const envConfig = require('../../main/config/env')

const jobs = require('./jobs')

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, envConfig.redisConfig),
  name: job.key,
  handle: job.handle 
}))

module.exports = {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name)

    return queue.bull.add(data)
  },

  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle)

      queue.bull.on('failed', (job, err) => {
        console.log(job)
        console.log(err)
      })
    })
  }
}