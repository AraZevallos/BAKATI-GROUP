const express = require('express')
const createError = require('http-errors')
const router = express.Router()

const { Category } = require('../models/category')
const { validate_id } = require('../middlewares/validate_id')
const { validate_category } = require('../middlewares/validate_models')

router.get('/', async function (req, res, next) {
    try {
        let categoryList = await Category.find()
        res.status(200).send(categoryList)
    } catch (error) {
        return next(createError(500, 'No se pudo encontrar la lista'))
    }
})
router.post('/', [validate_category], async function (req, res, next) {
    try {
        let category = new Category(req.body)
        category = await category.save()
        res.status(200).send(category)
    } catch (error) {
        return next(createError(500, error))
    }
})
router.put('/:id', [validate_id, validate_category], async function (req, res, next) {
    try {
        let category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!category) return next(createError(404, 'No existe una categoria con ese id.'))
        res.status(200).send(category)
    } catch (error) {
        return next(createError(500, error))
    }
})
router.delete('/:id', [validate_id], async function (req, res, next) {
    try {
        let category = await Category.findByIdAndRemove(req.params.id)
        if (!category) return next(createError(404, 'No existe una categoria con ese id.'))
        res.status(200).send(category)
    } catch (error) {
        return next(createError(500, error))
    }
})
router.get('/:id', [validate_id], async function (req, res, next) {
    const categoria = await Category.findById(req.params.id)
    if (!categoria) return next(createError(404, 'No existe una categoria con ese id.'))
    res.status(200).send(categoria)
})

module.exports = router