const request = require('supertest')
const mongoose = require('mongoose')
const { Category } = require('../../models/category')
const { Product } = require('../../models/product')
const { User } = require('../../models/user')
const { OrderItem } = require('../../models/order-item')
const { Order } = require('../../models/order')

let server
describe('Orders', () => {

  beforeEach(() => { server = require('../../bin/www') })
  afterEach(async () => { await server.close(); await Order.deleteMany({}); await User.deleteMany({}) })

  describe('GET /orders', () => {

    let token, user
    const exec = async () => {
      return await request(server).get('/api/v1/orders')
        .set('Authorization', 'bearer ' + token)
    }

    beforeEach(async () => {
      user = new User({ name: 'access', email: 'access', password: 'access', phone: '982987654', isAdmin: true })
      await user.save()
      token = user.generateAuthToken()
      let orders =
        [{
          user: user._id, orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()], status: 'entregado',
          totalPrice: 100, shippingAddress1: 'calle 1', city: 'ciudad1', zip: 'zip1', country: 'pais1', phone: 'telefono1'
        },
        {
          user: user._id, orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()], status: 'enviado',
          totalPrice: 200, shippingAddress1: 'calle 2', city: 'ciudad2', zip: 'zip2', country: 'pais2', phone: 'telefono2'
        }]
      await Order.insertMany(orders)
    })

    it('should return a 401 if client is not logged in', async () => {
      token = ''
      const res = await exec()
      expect(res.status).toBe(401)
    })

    it('should return a 200 if client is logged in and admin', async () => {
      const res = await exec()
      expect(res.status).toBe(200)
    })

    it('should return all orders', async () => {
      const res = await exec()
      expect(res.body.length).toBe(2)
      expect(res.body.some(o => o.status === 'entregado')).toBeTruthy()
      expect(res.body.some(o => o.status === 'enviado')).toBeTruthy()
    })
  })

  describe('GET /orders/:id', () => {

    let token, user, id
    const exec = async () => {
      return await request(server).get('/api/v1/orders/' + id)
        .set('Authorization', 'bearer ' + token)
    }

    beforeEach(async () => {
      user = new User({ name: 'access', email: 'access', password: 'access', phone: '982987654', isAdmin: true })
      await user.save()
      token = user.generateAuthToken()
      let order = new Order({
        user: user._id.toHexString(), orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()], status: 'entregado',
        totalPrice: 100, shippingAddress1: 'calle 1', city: 'ciudad1', zip: 'zip1', country: 'pais1', phone: 'telefono1'
      })
      await order.save()
      id = order._id.toHexString()
    })

    it('should return a 401 if client is not logged in', async () => {
      token = ''
      const res = await exec()
      expect(res.status).toBe(401)
    })

    it('should return a 200 if client is logged in and admin', async () => {
      const res = await exec()
      expect(res.status).toBe(200)
    })

    it('should return a 404 if the order is not found', async () => {
      id = mongoose.Types.ObjectId().toHexString()
      const res = await exec()
      expect(res.status).toBe(404)
    })

    it('should return an order', async () => {
      const res = await exec()
      expect(res.body).toHaveProperty('user')
      expect(res.body.user).toHaveProperty('name', 'access')
      expect(res.body).toHaveProperty('status', 'entregado')
      expect(res.body).toHaveProperty('totalPrice', 100)
      expect(res.body).toHaveProperty('shippingAddress1', 'calle 1')
      expect(res.body).toHaveProperty('city', 'ciudad1')
      expect(res.body).toHaveProperty('zip', 'zip1')
      expect(res.body).toHaveProperty('country', 'pais1')
      expect(res.body).toHaveProperty('phone', 'telefono1')
    })

  })

})