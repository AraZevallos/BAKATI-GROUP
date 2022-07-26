const express = require('express')
const router = express.Router()
const multer = require('multer')

const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getCountProducts, getFeaturedProducts, storage, updateProductGallery, addImagePath } = require('../controllers/controller-product')
const { validateProduct, validateProductGallery } = require('../middlewares/validate-product')
const { validateId } = require('../middlewares/validate-id')
const upload = multer({ storage: storage })

router.get('/', [getAllProducts])
router.get('/:id', [validateId, getProductById])
router.post('/', [upload.single('image'), addImagePath, validateProduct, createProduct])
router.put('/gallery-images/:id', [validateId, upload.array('images', 10), validateProductGallery, updateProductGallery])
router.put('/:id', [validateId, upload.single('image'), validateProduct, updateProduct])
router.delete('/:id', [validateId, deleteProduct])
router.get('/get/count', [getCountProducts])
router.get('/get/featured/:count', [getFeaturedProducts])

module.exports = router