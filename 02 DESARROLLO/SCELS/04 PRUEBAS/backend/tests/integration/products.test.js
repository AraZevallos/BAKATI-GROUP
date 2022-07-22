const request = require('supertest')
const mongoose = require('mongoose')
const { Category } = require('../../models/category')
const { Product } = require('../../models/product')
const { User } = require('../../models/user')

let server
describe('Products', () => {

  beforeEach(() => { server = require('../../bin/www') })
  afterEach(async () => { await server.close(); await Product.deleteMany({}); await Category.deleteMany({}) })

  describe('GET /products', () => {
    it('should return all products', async () => {
      const products = [
        { name: 'Product 1', description: 'description 1', countInStock: 10, category: mongoose.Types.ObjectId() },
        { name: 'Product 2', description: 'description 2', countInStock: 20, category: mongoose.Types.ObjectId() }]
      await Product.insertMany(products)
      const res = await request(server).get('/api/v1/products')
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
      expect(res.body.some(p => p.name === 'Product 1')).toBeTruthy()
      expect(res.body.some(p => p.name === 'Product 2')).toBeTruthy()
    })
  })

  describe('GET /products/:id', () => {

    it('should return a 400 if invalid id is passed', async () => {
      const res = await request(server).get('/api/v1/products/1')
      expect(res.status).toBe(400)
    })

    it('should return a 404 if the product is not found', async () => {
      const id = mongoose.Types.ObjectId().toHexString()
      const res = await request(server).get('/api/v1/products/' + id)
      expect(res.status).toBe(404)
    })

    it('should return a product if valid id is passed', async () => {
      let name = 'Product 1'
      let product = new Product({ name, description: 'description 1', countInStock: 10, category: mongoose.Types.ObjectId().toHexString() })
      await product.save()
      const res = await request(server).get('/api/v1/products/' + product._id.toHexString())
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name', name)
    })
  })
})