const express = require('express')
const router = express.Router()

const { validateId } = require('../middlewares/validate-id')
const { validateAuth, validateUser } = require('../middlewares/validate-user')
const { getAllUsers, getUserById, createUser } = require('../controllers/controller-users')
const { updateUser, deleteUser, loginUser, getCountUsers } = require('../controllers/controller-users')

router.get('/', [getAllUsers])
router.get('/:id', [validateId, getUserById])
router.post('/', [validateUser, createUser])
router.put('/:id', [validateId, validateUser, updateUser])
router.delete('/:id', [validateId, deleteUser])
router.post('/login', [validateAuth, loginUser])
router.get('/get/count', [getCountUsers])

module.exports = router