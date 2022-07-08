const createError = require('http-errors')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

function validateOrder(req, res, next) {
  const { error } = Joi.object({
    orderItems: Joi.array().required(),
    shippingAddress1: Joi.string().required(),
    shippingAddress2: Joi.string(),
    city: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
    status: Joi.string().required(),
    totalPrice: Joi.number().required(),
    user: Joi.ObjectId().required(),
    dateOrdered: Joi.date().default(Date.now)
  }).validate(req.body)
  if (error) { return next(createError(400, error)) }
  next()
}
module.exports = { validateOrder }