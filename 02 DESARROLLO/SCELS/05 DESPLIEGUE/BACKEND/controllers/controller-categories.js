const { Category } = require("../models/category");
const createError = require("http-errors");

async function getAllCategories(_req, res, next) {
  try {
    let categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (err) {
    next(createError(400, err.message));
  }
}
async function getCategoryById(req, res, next) {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      next(createError(404, "Category not found"));
    }
    res.status(200).json(category);
  } catch (err) {
    next(createError(400, err.message));
  }
}
async function createCategory(req, res, next) {
  try {
    let category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    next(createError(400, err.message));
  }
}
async function updateCategory(req, res, next) {
  try {
    let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      next(createError(404, "Category not found"));
    }
    res.status(200).json(category);
  } catch (err) {
    next(createError(400, err.message));
  }
}
async function deleteCategory(req, res, next) {
  try {
    let category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      next(createError(404, "Category not found"));
    }
    res.status(200).json(category);
  } catch (err) {
    next(createError(400, err.message));
  }
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
