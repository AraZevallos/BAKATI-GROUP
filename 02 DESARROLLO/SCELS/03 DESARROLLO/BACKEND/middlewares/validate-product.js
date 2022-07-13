const createError = require('http-errors')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

function validateProduct(req, res, next) {
  console.log("vale te amo")
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

module.exports = { validateProduct }