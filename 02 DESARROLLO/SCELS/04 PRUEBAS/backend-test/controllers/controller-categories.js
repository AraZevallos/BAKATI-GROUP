const { Category } = require("../models/category");
const createError = require("http-errors");

async function getAllCategories(req, res, next) {
  let categories = await Category.find().sort({ name: 1 });
  res.status(200).json(categories);
}
async function getCategoryById(req, res, next) {
  let category = await Category.findById(req.params.id);
  if (!category) return next(createError(404, "Category not found"));
  res.status(200).json(category);
}
async function createCategory(req, res, next) {
  let category = new Category(req.body);
  await category.save();
  res.status(201).json(category);
}
async function updateCategory(req, res, next) {
  let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) return next(createError(404, "Category not found"));
  res.status(200).json(category);
}
async function deleteCategory(req, res, next) {
  let category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return next(createError(404, "Category not found"));
  res.status(200).json(category);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
// End of file
// Language: javascript
// Path: controllers\controller-category.js
