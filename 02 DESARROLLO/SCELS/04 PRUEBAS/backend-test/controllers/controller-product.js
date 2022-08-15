const { Product } = require("../models/product");
const createError = require("http-errors");
const { Category } = require("../models/category");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split(" ").join("-");
    const ext = FILE_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

async function getAllProducts(req, res, next) {
  let filter = {};
  if (req.query.categories)
    filter = { category: req.query.categories.split(",") };
  let products = await Product.find(filter)
    .sort({ name: 1 })
    .populate("category");
  res.status(200).json(products);
}

async function getProductById(req, res, next) {
  let product = await Product.findById(req.params.id).populate("category");
  if (!product)
    return next(
      createError(404, "The product with the given ID was not found.")
    );
  res.json(product);
}

async function createProduct(req, res, next) {
  let category = await Category.findById(req.body.category);
  if (!category)
    return next(
      createError(404, "The category with the given ID was not found.")
    );
  let product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
}

async function addImagePath(req, res, next) {
  let file = req.file;
  if (!file) return next(createError(400, "No file uploaded"));
  const baseUrl = "/public/uploads/";
  req.body.image = baseUrl + req.file.filename;
  next();
}

async function updateProduct(req, res, next) {
  const baseUrl = "/public/uploads/";
  if (req.file) {
    req.body.image = baseUrl + req.file.filename;
  }
  let category = await Category.findById(req.body.category);
  if (!category)
    return next(
      createError(404, "The category with the given ID was not found.")
    );
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product)
    return next(
      createError(404, "The product with the given ID was not found.")
    );
  res.status(200).json(product);
}

async function updateProductGallery(req, res, next) {
  const baseUrl = "/public/uploads/";
  let gallery = [];
  req.files.forEach((file) => {
    gallery.push(baseUrl + file.filename);
  });
  req.body.images = gallery;
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(product);
}

async function deleteProduct(req, res, next) {
  let product = await Product.findByIdAndRemove(req.params.id);
  if (!product)
    return next(
      createError(404, "The product with the given ID was not found.")
    );
  res.status(200).json(product);
}

function getCountProducts(req, res, next) {
  Product.countDocuments((err, count) => {
    res.status(200).json({ count });
  });
}

async function getFeaturedProducts(req, res, next) {
  const count = req.params.count;
  let products = await Product.find({ isFeatured: true })
    .limit(+count)
    .sort({ name: 1 })
    .populate("category");
  res.status(200).json(products);
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCountProducts,
  getFeaturedProducts,
  updateProductGallery,
  addImagePath,
  storage,
};
// End of file
// Language: javascript
// Path: controllers\controller-category.js
