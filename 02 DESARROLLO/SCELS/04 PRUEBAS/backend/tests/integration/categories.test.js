const request = require('supertest')
const mongoose = require('mongoose')
const { Category } = require('../../models/category')
const { User } = require('../../models/user')

let server
describe('Categories', () => {

  beforeEach(() => { server = require('../../bin/www') })
  afterEach(async () => { await server.close(); await Category.deleteMany({}) })

  describe('GET /categories', () => {
    it('should return all categories', async () => {
      const categories = [{ name: 'Category 1' }, { name: 'Category 2' }]
      await Category.insertMany(categories)
      const res = await request(server).get('/api/v1/categories')
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
      expect(res.body.some(c => c.name === 'Category 1')).toBeTruthy()
      expect(res.body.some(c => c.name === 'Category 2')).toBeTruthy()
    })
  })

  describe('GET /categories/:id', () => {

    it('should return a 400 if invalid id is passed', async () => {
      const res = await request(server).get('/api/v1/categories/1')
      expect(res.status).toBe(400)
    })

    it('should return a 404 if the category is not found', async () => {
      const id = mongoose.Types.ObjectId().toHexString()
      const res = await request(server).get('/api/v1/categories/' + id)
      expect(res.status).toBe(404)
    })

    it('should return a category', async () => {
      let name = 'Category 1'
      let category = new Category({ name })
      await category.save()
      const res = await request(server).get('/api/v1/categories/' + category._id.toHexString())
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name', name)
    })
  })
})