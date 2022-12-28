const express = require('express')
const accountRouter = express.Router()

const { adapt } = require('../adapters/express-router-adapter')

const { makeAddAccountController } = require('../factory/controllers/account/add-account-controller-impl')

accountRouter.post('/create', adapt(makeAddAccountController()))

module.exports = accountRouter