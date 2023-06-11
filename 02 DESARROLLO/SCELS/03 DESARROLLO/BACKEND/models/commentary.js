const mongoose = require('mongoose');

const commentarySchema = mongoose.Schema({
  commentary: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
  },
  date: {
    type: Date,
  },
});
commentarySchema.virtual('id').get(function () {
  return this._id.toHexString();
});
commentarySchema.set('toJSON', { virtuals: true });

const Commentary = mongoose.model('Commentary', commentarySchema);
module.exports = { Commentary };
