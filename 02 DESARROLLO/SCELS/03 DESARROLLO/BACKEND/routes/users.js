const express = require('express')
const router = express.Router()

const { validateId } = require('../middlewares/validate-id')
const { validateAuth, validateUser } = require('../middlewares/validate-models')
const { getAllUsers, getUserById, createUser } = require('../controllers/controller-users')
const { updateUser, deleteUser, loginUser } = require('../controllers/controller-users')

router.get('/', [getAllUsers])
router.get('/:id', [validateId, getUserById])
router.post('/', [validateUser, createUser])
router.put('/:id', [validateId, validateUser, updateUser])
router.delete('/:id', [validateId, deleteUser])
router.post('/login', [validateAuth, loginUser])

module.exports = router