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

  describe('POST /products', () => {

    let token, product
    const exec = async () => {
      return await request(server)
        .post('/api/v1/products')
        .set('Authorization', 'bearer ' + token)
        .field('name', product.name)
        .field('description', product.description)
        .field('countInStock', product.countInStock)
        .field('category', product.category)
        .attach('image', 'tests/integration/assets/test.jpg')
    }

    beforeEach(async () => {
      token = new User({ _id: mongoose.Types.ObjectId(), isAdmin: true })
        .generateAuthToken()
      tempCategory = new Category({ name: 'Category 1' })
      await tempCategory.save()
      product = { name: 'Product 1', description: 'description 1', countInStock: 10, category: tempCategory._id.toHexString() }
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

    it('should return a 400 if product is invalid', async () => {
      product.name = ''
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('shoud return a 404 if category is not found', async () => {
      product.category = mongoose.Types.ObjectId().toHexString()
      const res = await exec()
      expect(res.status).toBe(404)
    })

    it('should save the product if it is valid', async () => {
      await exec()
      const temp = await Product.find({ name: product.name })
      expect(temp).not.toBeNull()
    })

    it('should return the product if it is valid', async () => {
      const res = await exec()
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name', product.name)
    })
  })

  describe('PUT /products/:id', () => {

    let token, product, id
    const exec = async () => {
      return await request(server)
        .put('/api/v1/products/' + id)
        .set('Authorization', 'bearer ' + token)
        .field('name', product.name)
        .field('description', product.description)
        .field('countInStock', product.countInStock)
        .field('category', product.category)
        .attach('image', 'tests/integration/assets/test.jpg')
    }

    beforeEach(async () => {
      token = new User({ _id: mongoose.Types.ObjectId(), isAdmin: true })
        .generateAuthToken()
      tempCategory = new Category({ name: 'Category 1' })
      await tempCategory.save()
      tempProduct = new Product({ name: 'Product 1', description: 'description 1', countInStock: 10, category: tempCategory._id.toHexString() })
      await tempProduct.save()
      id = tempProduct._id.toHexString()
      product = { name: 'Product 2', description: 'description 2', countInStock: 20, category: tempCategory._id.toHexString() }
    })

    it('should return a 401 if client is not logged in', async () => {
      token = ' '
      const res = await exec()
      expect(res.status).toBe(401)
    })

    it('should return a 400 if product is invalid', async () => {
      product.name = ''
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('should return a 404 if product is not found', async () => {
      id = mongoose.Types.ObjectId().toHexString()
      const res = await exec()
      expect(res.status).toBe(404)
    })

    it('should return a 404 if category is not found', async () => {
      product.category = mongoose.Types.ObjectId().toHexString()
      const res = await exec()
      expect(res.status).toBe(404)
    })

    it('should return a 200 if it is valid', async () => {
      const res = await exec()
      expect(res.status).toBe(200)
    })

    it('should update the product if it is valid', async () => {
      await exec()
      const temp = await Product.findById(id)
      expect(temp).not.toBeNull()
      expect(temp.name).toBe(product.name)
    })

    it('should return the updated product', async () => {
      const res = await exec()
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name', product.name)
    })
  })

  describe('DELETE /products/:id', () => {

    let token, product, id
    const exec = async () => {
      return await request(server).delete('/api/v1/products/' + id)
        .set('Authorization', 'bearer ' + token)
    }

    beforeEach(async () => {
      token = new User({ _id: mongoose.Types.ObjectId(), isAdmin: true })
        .generateAuthToken()
      tempCategory = new Category({ name: 'Category 1' })
      await tempCategory.save()
      tempProduct = new Product({ name: 'Product 1', description: 'description 1', countInStock: 10, category: tempCategory._id.toHexString() })
      await tempProduct.save()
      id = tempProduct._id.toHexString()
    })

    it('should return a 401 if client is not logged in', async () => {
      token = ' '
      const res = await exec()
      expect(res.status).toBe(401)
    })

    it('should return a 404 if product is not found', async () => {
      id = mongoose.Types.ObjectId().toHexString()
      const res = await exec()
      expect(res.status).toBe(404)
    })

    it('should return a 400 if invalid id is passed', async () => {
      id = '123'
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('should return a 200 if it is valid', async () => {
      const res = await exec()
      expect(res.status).toBe(200)
    })

    it('should delete the product if it is valid', async () => {
      await exec()
      const temp = await Product.findById(id)
      expect(temp).toBeNull()
    })
  })

})