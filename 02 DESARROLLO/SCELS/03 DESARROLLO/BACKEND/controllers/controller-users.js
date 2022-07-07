const { User } = require('../models/user')
const createError = require('http-errors')
const bcrypt = require('bcrypt')

async function getAllUsers(req, res, next) {
  try {
    let users = await User.find({}).select('-password')
    res.status(200).json(users)
  } catch (err) {
    return next(createError(400, 'Users not found'))
  }
}
async function getUserById(req, res, next) {
  try {
    let user = await User.findById(req.params.id).select('-password')
    res.status(200).json(user)
  } catch (err) {
    return next(createError(400, 'User not found'))
  }
}
async function createUser(req, res, next) {
  req.body.password = bcrypt.hashSync(req.body.password, 10)
  try {
    let user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    return next(createError(400, 'User not created'))
  }
}
async function updateUser(req, res, next) {
  let userExist = await User.findById(req.params.id)
    (req.body.password)
    ? req.body.password = bcrypt.hashSync(req.body.password, 10)
    : req.body.password = userExist.password
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(user)
  } catch (err) {
    return next(createError(400, 'User not updated'))
  }
}
async function deleteUser(req, res, next) {
  try {
    let user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    return next(createError(400, 'User not deleted'))
  }
}
async function loginUser(req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      return next(createError(400, 'User not found'))
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return next(createError(400, 'Password is incorrect'))
    }
    let token = user.generateToken()
    res.status(200).json({ user: user.email, token: token })
  } catch (err) {
    return next(createError(400, 'User not logged in'))
  }
}
module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser }
// End of file
// Language: javascript
// Path: controllers\controller-category.js