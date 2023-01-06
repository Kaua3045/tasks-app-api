require('dotenv/config')
const express = require('express')
const { serve, setup } = require('swagger-ui-express')

const swaggerConfig = require('../docs')

const app = express()

require('../../infra/database/sequelize/sequelize-connection')

app.use('/api-docs', serve, setup(swaggerConfig))
app.use(express.json())
app.use('/api', require('../routes/routes'))

module.exports = app