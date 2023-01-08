const Queue = require('bull')
const envConfig = require('../../main/config/env')

const SendMailConfirmAccountJob = require('../queue/jobs/send-mail-confirm-account-job')

const mailQueue = new Queue(SendMailConfirmAccountJob.key, envConfig.redisConfig)

mailQueue.on('failed', (err, data) => {
  console.log(err)
  console.log(data)
})

module.exports = mailQueue