const express = require('express')
const accountRouter = express.Router()

const { adapt } = require('../adapters/express-router-adapter')

const { makeAddAccountController } = require('../factory/controllers/account/add-account-controller-impl')
const { makeAuthenticateController } = require('../factory/controllers/account/authenticate-controller-impl')

accountRouter.post('/create', adapt(makeAddAccountController()))
accountRouter.post('/auth', adapt(makeAuthenticateController()))

module.exports = accountRouter