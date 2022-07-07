const express = require('express')
const router = express.Router()

const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/controller-category')
const { validateCategory } = require('../middlewares/validate-models')
const { validateId } = require('../middlewares/validate-id')

router.get('/', [getAllCategories])
router.get('/:id', [validateId, getCategoryById])
router.post('/', [validateCategory, createCategory])
router.put('/:id', [validateId, validateCategory, updateCategory])
router.delete('/:id', [validateId, deleteCategory])

module.exports = router