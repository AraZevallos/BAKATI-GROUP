const mongoose = require("mongoose");
const logger = require("../utils/logger");
require("express-async-errors");

module.exports = function () {
  const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  mongoose
    .connect(db)
    .then(() => {
      logger.info("Database Connection is ready...");
    })
    .catch((err) => {
      logger.error(err);
    });
};
