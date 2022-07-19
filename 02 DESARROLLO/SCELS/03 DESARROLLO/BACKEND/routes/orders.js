const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_51LN2VQG9VZofBzhLnpB0gxAid5MVYeQsKq4NHZiYNjJceojKBMRW1HUjsnnm3pF4mvcbGXW9IsRKWsKQIPLOV9j100sOmnJcTg');

const { Product } = require('../models/product');

const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, getCountOrders, getOrdersByUser, getTotalSales } = require('../controllers/controller-order')
const { validateOrder, validateOrderStatus } = require('../middlewares/validate-order')
const { validateId } = require('../middlewares/validate-id')

router.get('/', [getAllOrders])
router.get('/get/count', [getCountOrders])
router.get('/get/totalsales', [getTotalSales])
router.get('/get/userorders/:id', [validateId, getOrdersByUser])
router.get('/:id', [validateId, getOrderById])
router.post('/', [validateOrder, createOrder])
router.post('/create-checkout-session', async (req, res) => {
    const orderItems = req.body;

    if (!orderItems) {
        return res.status(400).send('checkout no puede ser creado - verifica los items de la orden');
    }
    const lineItems = await Promise.all(
        orderItems.map(async (orderItem) => {
            const product = await Product.findById(orderItem.product);
            return {
                price_data: {
                    currency: 'pen',
                    product_data: {
                        name: product.name
                    },
                    unit_amount: product.price * 100
                },
                quantity: orderItem.quantity
            };
        })
    );
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:4200/success',
        cancel_url: 'http://localhost:4200/error'
    });

    res.json({ id: session.id });
});
router.put('/:id', [validateId, validateOrderStatus, updateOrder])
router.delete('/:id', [validateId, deleteOrder])

module.exports = router