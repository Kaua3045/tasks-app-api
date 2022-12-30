require('dotenv/config')
const express = require('express')
const app = express()

require('../../infra/database/sequelize/sequelize-connection')

app.use(express.json())
app.use('/api', require('../routes/routes'))

module.exports = app