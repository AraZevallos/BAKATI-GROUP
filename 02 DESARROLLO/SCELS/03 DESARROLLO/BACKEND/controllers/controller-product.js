const { Product } = require('../models/product')
const createError = require('http-errors')
const { Category } = require('../models/category')

async function getAllProducts(req, res, next) {
  let filter = {}
  if (req.query.categories) filter = { category: req.query.categories.split(',') }
  try {
    let products = await Product.find(filter).sort({ name: 1 }).populate('category')
    res.status(200).send(products)
  } catch (err) {
    return next(createError(400, 'Products not found'))
  }
}
async function getProductById(req, res, next) {
  try {
    let product = await Product.findById(req.params.id).populate('category')
    res.send(product)
  } catch (err) {
    return next(createError(400, 'Product not found'))
  }
}
async function createProduct(req, res, next) {
  try {
    let category = await Category.findById(req.body.category)
    if (!category) return next(createError(400, 'Category not found'))
    let product = new Product(req.body)
    await product.save()
    res.status(200).send(product)
  } catch (err) {
    return next(createError(400, 'Produt not created'))
  }
}
async function updateProduct(req, res, next) {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).send(product)
  } catch (err) {
    return next(createError(400, 'Product not updated'))
  }
}
async function deleteProduct(req, res, next) {
  try {
    let product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).send(product)
  } catch (err) {
    return next(createError(400, 'Product not deleted'))
  }
}
function getCountProducts(req, res, next) {
  try {
    Product.countDocuments((err, count) => {
      if (err) { return next(createError(400, 'Count not found')) }
      else { res.status(200).send({ count }) }
    })
  } catch (err) {
    return next(createError(400, 'Count not found'))
  }
}
async function getFeaturedProducts(req, res, next) {
  const count = req.params.count ? req.params.count : 0
  try {
    let products = await Product.find({ isFeatured: true }).limit(+count).sort({ name: 1 }).populate('category')
    res.status(200).send(products)
  } catch (err) {
    return next(createError(400, 'Products not found'))
  }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getCountProducts, getFeaturedProducts }
// End of file
// Language: javascript
// Path: controllers\controller-category.js