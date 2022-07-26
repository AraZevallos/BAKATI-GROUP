const { createLogger, format, transports } = require("winston");

// Import mongodb
require("winston-mongodb");

module.exports = createLogger({
  transports: [
    // File transport
    new transports.File({
      filename: "logs/file_logs.log",
      handleExceptions: true,
      handleRejections: true,
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
  exitOnError: false,
});
