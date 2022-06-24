const createError = require('http-errors')
const Joi = require('joi')

function validate_category(req, res, next) {
    const { error } = Joi.object({
        name: Joi.string().required(),
        icon: Joi.string(),
        color: Joi.string(),
    }).validate(req.body)
    if (error) { next(createError(400, error)) }
    next()
}

function validate_product(req, res, next) {
    const { error } = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        richDescription: Joi.string().default(''),
        image: Joi.string().default(''),
        images: Joi.array().default([]),
        brand: Joi.string().default(''),
        price: Joi.number().default(0),
        category: Joi.string().required(),
        countInStock: Joi.number().required().min(0).max(255),
        rating: Joi.number().default(0),
        numReviews: Joi.number().default(0),
        isFeatured: Joi.boolean().default(false),
        dateCreated: Joi.date().default(Date.now),
    })
    if (error) { next(createError(400, error)) }
    next()
}

module.exports = { validate_category, validate_product }