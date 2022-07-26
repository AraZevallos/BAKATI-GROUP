const createError = require('http-errors')
const mongoose = require('mongoose')

function validateId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return next(createError(400, 'Invalid id.'))
  next()
}
module.exports = { validateId }