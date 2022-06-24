const { Product } = require('../models/product');
const { Category } = require('../models/category');
const express = require('express');
const { validate_product } = require('../middlewares/validate_models');
const { validate_id } = require('../middlewares/validate_id');
const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        let productList = await Product.find()
        res.status(200).send(productList)
    } catch (error) {
        return next(createError(500, 'No se pudo encontrar la lista'))
    }
})
router.post('/', [validate_product], async function (req, res, next) {
    const category = await Category.findById(req.body.category)
    if (!category) return next(createError(400, 'Id de categoria no es valido'))
    try {
        let product = new Product(req.body)
        product = await product.save()
        res.status(200).send(product)
    } catch (error) {
        return next(createError(500, error))
    }
})
router.put('/:id', [validate_id, validate_product], async function (req, res, next) {
    const category = await Category.findById(req.body.category)
    if (!category) return next(createError(400, 'Id de categoria no es valido'))
    try {
        let product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) return next(createError(404, 'No existe un producto con ese id.'))
        res.status(200).send(product)
    } catch (error) {
        return next(createError(500, error))
    }
})
router.delete('/:id', [validate_id], async function (req, res, next) {
    try {
        let product = await Product.findByIdAndRemove(req.params.id, req.body, { new: true })
        if (!product) return next(createError(404, 'No existe un producto con ese id.'))
        res.status(200).send(product)
    } catch (error) {
        return next(createError(500, error))
    }
})
router.get('/:id', [validate_id], async function (req, res, next) {
    const categoria = await Product.findById(req.params.id)
    if (!categoria) return next(createError(404, 'No existe un producto con ese id.'))
    res.status(200).send(categoria)
})
module.exports = router;