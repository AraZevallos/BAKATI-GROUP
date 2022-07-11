const express = require('express')
const router = express.Router()

const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, getCountOrders, getOrdersByUser, getTotalSales } = require('../controllers/controller-order')
const { validateOrder } = require('../middlewares/validate-order')
const { validateId } = require('../middlewares/validate-id')

router.get('/', [getAllOrders])
router.get('/get/count', [getCountOrders])
router.get('/get/totalsales', [getTotalSales])
router.get('/get/userorders/:id', [validateId, getOrdersByUser])
router.get('/:id', [validateId, getOrderById])
router.post('/', [validateOrder, createOrder])
router.put('/:id', [validateId, validateOrder, updateOrder])
router.delete('/:id', [validateId, deleteOrder])

module.exports = router