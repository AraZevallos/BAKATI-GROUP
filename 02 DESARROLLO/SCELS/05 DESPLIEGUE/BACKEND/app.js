const express = require("express");
require("dotenv").config({ path: "./.env" });
const logger = require("./utils/logger");

const app = express();
require("./startup/database")();
require("./startup/extensions")(app);
require("./startup/routes")(app);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

module.exports = app;
