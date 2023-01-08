require('dotenv/config')

const Queue = require('../infra/queue/bull-queue')

Queue.process()