const express = require("express")
require('dotenv').config({ path: './.env' })
const logger = require('./utils/logger')

const app = express()
require('./startup/database')(process.env.CONNECTION_STRING)
require('./startup/extensions')(app)
require('./startup/routes')(app)
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))

//Server
app.listen(3000, () => {
  logger.info("server is running http://localhost:3000")
})
