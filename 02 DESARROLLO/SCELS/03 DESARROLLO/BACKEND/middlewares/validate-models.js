const createError = require('http-errors')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

function validateCategory(req, res, next) {
  const { error } = Joi.object({
    name: Joi.string().required(),
    icon: Joi.string(),
    color: Joi.string(),
  }).validate(req.body)
  if (error) { return next(createError(400, error)) }
  next()
}
function validateProduct(req, res, next) {
  const { error } = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    richDescription: Joi.string().default(''),
    image: Joi.string().default(''),
    images: Joi.array().default([]),
    brand: Joi.string().default(''),
    price: Joi.number().default(0),
    category: Joi.objectId().required(),
    countInStock: Joi.number().required().min(0).max(255),
    rating: Joi.number().default(0),
    numReviews: Joi.number().default(0),
    isFeatured: Joi.boolean().default(false),
    dateCreated: Joi.date().default(Date.now),
  }).validate(req.body)
  if (error) { return next(createError(400, error)) }
  next()
}
function validateUser(req, res, next) {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    passwordHash: Joi.string().required(),
    phone: Joi.string().required(),
    isAdmin: Joi.boolean().default(false),
    street: Joi.string().default(''),
    apartment: Joi.string().default(''),
    city: Joi.string().default(''),
    country: Joi.string().default(''),
    zip: Joi.string().default(''),
  }).validate(req.body)
  if (error) { return next(createError(400, error)) }
  next()
}

module.exports = { validateCategory, validateProduct, validateUser }