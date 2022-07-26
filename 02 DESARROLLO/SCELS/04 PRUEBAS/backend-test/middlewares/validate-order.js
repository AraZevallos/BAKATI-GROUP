const createError = require('http-errors')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

function validateOrder(req, res, next) {
  const { error } = Joi.object({
    orderItems: Joi.array().items({ product: Joi.objectId().required(), quantity: Joi.number().required() }),
    shippingAddress1: Joi.string().required(),
    shippingAddress2: Joi.string(),
    city: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
    status: Joi.string().required(),
    totalPrice: Joi.number(),
    user: Joi.objectId().required(),
    dateOrdered: Joi.date().default(Date.now)
  }).validate(req.body)
  if (error) { return next(createError(400, error)) }
  next()
}

function validateOrderStatus(req, res, next) {
  const status = ['pendiente', 'en proceso', 'entregado']
  const { error } = Joi.object({
    status: Joi.string().valid(...Object.values(status)).required()
  }).validate(req.body)
  if (error) { return next(createError(400, error)) }
  next()
}

function validateOrderCheckout(req, res, next) {
  const { error } = Joi.array().items({
    product: Joi.objectId().required(),
    quantity: Joi.number().required()
  }).validate(req.body)
  if (error) { return next(createError(400, error)) }
  next()
}

module.exports = { validateOrder, validateOrderStatus, validateOrderCheckout }