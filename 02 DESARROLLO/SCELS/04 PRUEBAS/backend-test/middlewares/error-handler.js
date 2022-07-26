const logger = require('../utils/logger')

module.exports = function (err, req, res, next) {
  logger.error(err.message)
  res.status(err.status || 500).send(err)
}