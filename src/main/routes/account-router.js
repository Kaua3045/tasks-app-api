const express = require('express')
const accountRouter = express.Router()

const { adapt } = require('../adapters/express-router-adapter')
const auth = require('../middlewares/auth')

const { makeMeAccountController } = require('../factory/controllers/account/me-account-controller-impl')
const { makeAddAccountController } = require('../factory/controllers/account/add-account-controller-impl')
const { makeAuthenticateController } = require('../factory/controllers/account/authenticate-controller-impl')
const { makeConfirmAccountController } = require('../factory/controllers/account/confirm-account-controller-impl')

accountRouter.get('/me', auth, adapt(makeMeAccountController()))
accountRouter.post('/create', adapt(makeAddAccountController()))
accountRouter.post('/auth', adapt(makeAuthenticateController()))
accountRouter.patch('/confirm/:token', adapt(makeConfirmAccountController()))

module.exports = accountRouter