require('dotenv/config')

const Queue = require('../infra/queue/bull-queue')
const sendMailConfirmAccountJob = require('../infra/queue/jobs/send-mail-confirm-account-job')

Queue.process(sendMailConfirmAccountJob.sendMail)