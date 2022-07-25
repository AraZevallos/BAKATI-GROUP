const { User } = require('../models/user')
const createError = require('http-errors')
const bcrypt = require('bcrypt')

async function getAllUsers(req, res, next) {
  let users = await User.find({}).select('-password')
  res.status(200).json(users)
}

async function getUserById(req, res, next) {
  let user = await User.findById(req.params.id).select('-password')
  if (!user) return next(createError(404, 'User not found'))
  res.status(200).json(user)
}

async function createUser(req, res, next) {
  req.body.password = bcrypt.hashSync(req.body.password, 10)
  let user = await User.create(req.body)
  res.status(201).json(user)
}

async function updateUser(req, res, next) {
  let user = await User.findById(req.params.id)
  if (!user) return next(createError(404, 'User not found'))
  if (req.body.password) { req.body.password = bcrypt.hashSync(req.body.password, 10) }
  else { req.body.password = user.password }
  user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(user)
}

async function deleteUser(req, res, next) {
  let user = await User.findByIdAndDelete(req.params.id)
  if (!user) return next(createError(404, 'User not found'))
  res.status(200).json(user)
}

async function loginUser(req, res, next) {
  let user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(createError(404, 'User not found'))
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return next(createError(400, 'Password is incorrect'))
  }
  let token = user.generateAuthToken()
  res.status(200).json({ user: user.email, token: token })
}

function getCountUsers(req, res, next) {
  User.countDocuments((err, count) => { res.status(200).json({ count }) })
}
module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser, getCountUsers }
// End of file
// Language: javascript
// Path: controllers\controller-category.js