const createError = require("http-errors");
const Joi = require("joi");

function validateCategory(req, res, next) {
  const { error } = Joi.object({
    name: Joi.string().required(),
    icon: Joi.string(),
    color: Joi.string(),
  }).validate(req.body);
  if (error) {
    return next(createError(400, error));
  }
  next();
}

module.exports = { validateCategory };
