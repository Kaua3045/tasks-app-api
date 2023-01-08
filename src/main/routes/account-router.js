const express = require('express')
const accountRouter = express.Router()

const { adapt } = require('../adapters/express-router-adapter')
const auth = require('../middlewares/auth')

const { makeMeAccountController } = require('../factory/controllers/account/me-account-controller-factory')
const { makeAddAccountController } = require('../factory/controllers/account/add-account-controller-factory')
const { makeAuthenticateController } = require('../factory/controllers/account/authenticate-controller-factory')
const { makeConfirmAccountController } = require('../factory/controllers/account/confirm-account-controller-factory')
const { makeSendOtherMailConfirmAccountController } = require('../factory/controllers/account/send-other-mail-confirm-account-controller-factory')

accountRouter.get('/me', auth, adapt(makeMeAccountController()))
accountRouter.post('/create', adapt(makeAddAccountController()))
accountRouter.post('/auth', adapt(makeAuthenticateController()))
accountRouter.patch('/confirm/:token', adapt(makeConfirmAccountController()))
accountRouter.get('/confirm/resend', auth, adapt(makeSendOtherMailConfirmAccountController()))

module.exports = accountRouter