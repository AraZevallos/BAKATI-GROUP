const createError = require('http-errors');
const Joi = require('joi');

function validateCommentary(req, res, next) {
  const { error } = Joi.object({
    commentary: Joi.string().required(),
    correo: Joi.string().required(),
    nombres: Joi.string().required(),
    apellidos: Joi.string().required(),
    telefono: Joi.string(),
    date: new Date(),
  }).validate(req.body);
  if (error) {
    return next(createError(400, error));
  }
  next();
}

module.exports = { validateCommentary };
