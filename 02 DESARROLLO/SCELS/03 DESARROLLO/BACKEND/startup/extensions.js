const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
const authenticate = require('../middlewares/validate-jwt');
const error = require('../middlewares/error');

module.exports = function (app) {
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(helmet());
  app.use(compression());
  //app.use(authenticate());
  app.use(error);
};
