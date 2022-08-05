const createError = require("http-errors");
const Joi = require("joi");

function validateUser(req, _res, next) {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string(),
    phone: Joi.string().required(),
    isAdmin: Joi.boolean().default(false),
    street: Joi.string().default(""),
    apartment: Joi.string().default(""),
    city: Joi.string().default(""),
    country: Joi.string().default(""),
    zip: Joi.string().default(""),
  }).validate(req.body);
  if (error) {
    return next(createError(400, error));
  }
  next();
}
function validateAuth(req, _res, next) {
  const { error } = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(req.body);
  if (error) {
    return next(createError(400, error));
  }
  next();
}

module.exports = { validateUser, validateAuth };
