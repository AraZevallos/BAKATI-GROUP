const createError = require('http-errors')
const mongoose = require('mongoose')

function validateId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    next(createError(404, 'Invalid id.'))
  next()
}
module.exports = { validateId }