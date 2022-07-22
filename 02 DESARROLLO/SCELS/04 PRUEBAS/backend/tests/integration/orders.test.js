const request = require('supertest')
const mongoose = require('mongoose')
const { User } = require('../../models/user')
const { Product } = require('../../models/product')
const { OrderItem } = require('../../models/order-item')
const { Order } = require('../../models/order')

let server
describe('Orders', () => {

  beforeEach(() => { server = require('../../bin/www') })
  afterEach(async () => { await server.close(); await Order.deleteMany({}); await User.deleteMany({}); await Product.deleteMany({}); await OrderItem.deleteMany({}) })

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
      token = ' '
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
      token = ' '
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

  describe('POST /orders', () => {

    let token, user, order
    const exec = async () => {
      return await request(server).post('/api/v1/orders')
        .set('Authorization', 'bearer ' + token).send(order)
    }

    beforeEach(async () => {
      user = new User({ name: 'access', email: 'access', password: 'access', phone: '982987654', isAdmin: true })
      token = user.generateAuthToken()
      let tempProduct1 = new Product({ name: 'producto1', price: 100, description: 'descripcion1', category: mongoose.Types.ObjectId().toHexString(), countInStock: 10 })
      let tempProduct2 = new Product({ name: 'producto2', price: 200, description: 'descripcion2', category: mongoose.Types.ObjectId().toHexString(), countInStock: 20 })
      await user.save()
      await tempProduct1.save()
      await tempProduct2.save()
      orderItems = [{ product: tempProduct1._id.toHexString(), quantity: 1 }, { product: tempProduct2._id.toHexString(), quantity: 2 }]
      order = {
        user: user._id.toHexString(), orderItems: orderItems, status: 'entregado',
        shippingAddress1: 'calle 1', city: 'ciudad1', zip: 'zip1', country: 'pais1', phone: 'telefono1'
      }
    })

    it('should return a 401 if client is not logged in', async () => {
      token = ' '
      const res = await exec()
      expect(res.status).toBe(401)
    })

    it('should return a 201 if client is logged in and admin', async () => {
      const res = await exec()
      expect(res.status).toBe(201)
    })

    it('should return a 400 if order is invalid', async () => {
      order = { orderItems: orderItems }
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('should save the order if it is valid', async () => {
      const res = await exec()
      const orderInDb = await Order.findById(res.body._id)
      expect(orderInDb).not.toBeNull()
    })

    it('should return the order if it is valid', async () => {
      const res = await exec()
      expect(res.body).toHaveProperty('user')
      expect(res.body).toHaveProperty('status', order.status)
      expect(res.body).toHaveProperty('totalPrice')
      expect(res.body).toHaveProperty('shippingAddress1', order.shippingAddress1)
      expect(res.body).toHaveProperty('city', order.city)
      expect(res.body).toHaveProperty('zip', order.zip)
      expect(res.body).toHaveProperty('country', order.country)
      expect(res.body).toHaveProperty('phone', order.phone)
    })
  })
})