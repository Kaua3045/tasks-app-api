const express = require('express')
const app = express()

app.use(express.json())

require('../infra/database/sequelize/sequelize-connection')

app.use('/api', require('./routes/routes'))

app.listen(3000, () => console.log('Server running'))