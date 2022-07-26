const mongoose = require('mongoose')
const logger = require('../utils/logger')
require('express-async-errors')

module.exports = function (db) {
  mongoose.connect(db)
    .then(() => { logger.info('Database Connection is ready...') })
    // .catch(err => { logger.error('Could not connect to MongoDB...') })
}