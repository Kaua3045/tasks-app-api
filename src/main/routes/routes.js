const express = require('express')
const router = express.Router()

const accountRouter = require('./account-router')
const taskRouter = require('./task-router')

router.use('/account', accountRouter)
router.use('/task', taskRouter)

module.exports = router