const logger = require("../utils/logger");

module.exports = function (err, _req, res, _next) {
  if (err.message) {
    logger.error(err.message);
    res.status(err.status || 500).json({ message: err.message });
  } else {
    logger.error(err);
    res.status(err.status || 500).json({ message: err });
  }
};
