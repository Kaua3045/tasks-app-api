require('dotenv/config')
const express = require('express')
const cors = require('cors')
const { serve, setup } = require('swagger-ui-express')

const swaggerConfig = require('../docs')
const rateLimit = require('./rate-limit')

const app = express()

require('../../infra/database/sequelize/sequelize-connection')

app.use(rateLimit)
app.use(cors())
app.use('/api-docs', serve, setup(swaggerConfig))
app.use(express.json())
app.use('/api', require('../routes/routes'))

module.exports = app