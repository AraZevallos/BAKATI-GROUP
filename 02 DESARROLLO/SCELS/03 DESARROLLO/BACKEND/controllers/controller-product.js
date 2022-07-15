const { Product } = require('../models/product')
const createError = require('http-errors')
const { Category } = require('../models/category')

async function getAllProducts(req, res, next) {
  let filter = {}
  if (req.query.categories) filter = { category: req.query.categories.split(',') }
  try {
    let products = await Product.find(filter).sort({ name: 1 }).populate('category')
    res.status(200).json(products)
  } catch (err) {
    return next(createError(400, err.message))
  }
}
async function getProductById(req, res, next) {
  try {
    let product = await Product.findById(req.params.id).populate('category')
    res.json(product)
  } catch (err) {
    return next(createError(400, err.message))
  }
}
async function createProduct(req, res, next) {
  console.log(req)
  try {
    console.log(req)
    let category = await Category.findById(req.body.category)
    if (!category) return next(createError(400, 'Category not found'))
    let product = new Product(req.body)
    await product.save()
    res.status(200).json(product)
  } catch (err) {
    return next(createError(400, err.message))
  }
}
async function updateProduct(req, res, next) {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(product)
  } catch (err) {
    return next(createError(400, err.message))
  }
}
async function deleteProduct(req, res, next) {
  try {
    let product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json(product)
  } catch (err) {
    return next(createError(400, err.message))
  }
}
function getCountProducts(req, res, next) {
  Product.countDocuments((err, count) => {
    if (err) { return next(createError(400, err.message)) }
    else { res.status(200).json({ count }) }
  })
}
async function getFeaturedProducts(req, res, next) {
  const count = req.params.count ? req.params.count : 0
  try {
    let products = await Product.find({ isFeatured: true }).limit(+count).sort({ name: 1 }).populate('category')
    res.status(200).json(products)
  } catch (err) {
    return next(createError(400, err.message))
  }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getCountProducts, getFeaturedProducts }
// End of file
// Language: javascript
// Path: controllers\controller-category.js