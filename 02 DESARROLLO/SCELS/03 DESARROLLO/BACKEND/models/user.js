const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String, required: true
  },
  email: {
    type: String, required: true
  },
  password: {
    type: String, required: true
  },
  phone: {
    type: String, required: true
  },
  isAdmin: {
    type: Boolean, default: false
  },
  street: {
    type: String, default: ''
  },
  apartment: {
    type: String, default: ''
  },
  city: {
    type: String, default: ''
  },
  country: {
    type: String, default: ''
  },
  zip: {
    type: String, default: ''
  }
})
userSchema.virtual('id').get(function () { return this._id.toHexString() })
userSchema.set('toJSON', { virtuals: true })
userSchema.methods.generateAuthToken = function () {
  // jwt.sign() is a method that takes two arguments: an object to encode and a secret
  const token = jwt.sign({ userId: this._id, isAdmin: this.isAdmin }, process.env.JWT_KEY)
  return token
}

const User = mongoose.model('User', userSchema)
module.exports = { User }
