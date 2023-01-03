const express = require('express')
const accountRouter = express.Router()

const { adapt } = require('../adapters/express-router-adapter')
const auth = require('../middlewares/auth')

const { makeMeAccountController } = require('../factory/controllers/account/me-account-controller-impl')
const { makeAddAccountController } = require('../factory/controllers/account/add-account-controller-impl')
const { makeAuthenticateController } = require('../factory/controllers/account/authenticate-controller-impl')

accountRouter.get('/me', auth, adapt(makeMeAccountController()))
accountRouter.post('/create', adapt(makeAddAccountController()))
accountRouter.post('/auth', adapt(makeAuthenticateController()))

module.exports = accountRouter