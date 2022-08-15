const { User } = require("../models/user");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

async function getAllUsers(_req, res, next) {
  try {
    let users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (err) {
    return next(createError(400, err.message));
  }
}
async function getUserById(req, res, next) {
  try {
    let user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return next(createError(400, "User not found"));
    }
    res.status(200).json(user);
  } catch (err) {
    return next(createError(400, err.message));
  }
}
async function createUser(req, res, next) {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  try {
    let user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    return next(createError(400, err.message));
  }
}
async function updateUser(req, res, next) {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    } else {
      let temp = await User.findById(req.params.id);
      req.body.password = temp.password;
    }
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return next(createError(400, "User not found"));
    }
    res.status(200).json(user);
  } catch (err) {
    return next(createError(400, err.message));
  }
}
async function deleteUser(req, res, next) {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(createError(400, "User not found"));
    }
    res.status(200).json(user);
  } catch (err) {
    return next(createError(400, err.message));
  }
}
async function loginUser(req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(400, "User not found"));
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return next(createError(400, "Password is incorrect"));
    }
    let token = user.generateAuthToken();
    res.status(200).json({ user: user.email, token: token });
  } catch (err) {
    return next(createError(400, err.message));
  }
}
function getCountUsers(_req, res, next) {
  User.countDocuments((err, count) => {
    if (err) {
      return next(createError(400, err.message));
    } else {
      res.status(200).json({ count });
    }
  });
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getCountUsers,
};
// End of file
// Language: javascript
// Path: controllers\controller-category.js
