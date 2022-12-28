const express = require('express')
const router = express.Router()

const accountRouter = require('./account-router')

router.use('/account', accountRouter)

module.exports = router