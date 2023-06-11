const express = require('express');
const router = express.Router();

const {
  getAllCommentaries,
  getCommentaryById,
  createCommentary,
  updateCommentary,
  deleteCommentary,
} = require('../controllers/controller-commentaries');
const { validateCommentary } = require('../middlewares/validate-commentary');
const { validateId } = require('../middlewares/validate-id');

router.get('/', [getAllCommentaries]);
router.get('/:id', [validateId, getCommentaryById]);
router.post('/', [validateCommentary, createCommentary]);
router.put('/:id', [validateId, validateCommentary, updateCommentary]);
router.delete('/:id', [validateId, deleteCommentary]);

module.exports = router;
