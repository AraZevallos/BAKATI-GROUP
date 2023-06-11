const { Commentary } = require('../models/commentary');
const createError = require('http-errors');

async function getAllCommentaries(req, res, next) {
  try {
    let commentaries = await Commentary.find().sort({ name: 1 });
    res.status(200).json(commentaries);
  } catch (err) {
    next(createError(400, err.message));
  }
}
async function getCommentaryById(req, res, next) {
  try {
    let commentary = await Commentary.findById(req.params.id);
    res.status(200).json(commentary);
  } catch (err) {
    next(createError(400, err.message));
  }
}
async function createCommentary(req, res, next) {
  try {
    let commentary = new Commentary(req.body);
    await commentary.save();
    res.status(201).json(commentary);
  } catch (err) {
    next(createError(400, err.message));
  }
}
async function updateCommentary(req, res, next) {
  try {
    let commentary = await Commentary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(commentary);
  } catch (err) {
    return next(createError(400, err.message));
  }
}

async function deleteCommentary(req, res, next) {
  try {
    let commentary = await Commentary.findByIdAndDelete(req.params.id);
    res.status(200).json(commentary);
  } catch (err) {
    next(createError(400, err.message));
  }
}

module.exports = {
  getAllCommentaries,
  getCommentaryById,
  createCommentary,
  updateCommentary,
  deleteCommentary,
};
// End of file
// Language: javascript
// Path: controllers\controller-commentary.js
