const express = require('express')
const router = express.Router()

const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getCountProducts, getFeaturedProducts } = require('../controllers/controller-product')
const { validateProduct } = require('../middlewares/validate-models')
const { validateId } = require('../middlewares/validate-id')

router.get('/', [getAllProducts])
router.get('/:id', [validateId, getProductById])
router.post('/', [validateProduct, createProduct])
router.put('/:id', [validateId, validateProduct, updateProduct])
router.delete('/:id', [validateId, deleteProduct])
router.get('/get/count', [getCountProducts])
router.get('/get/featured/:count', [getFeaturedProducts])

module.exports = router