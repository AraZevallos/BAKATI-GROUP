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

  describe('POST /categories', () => {

    let token, name
    const exec = async () => {
      return await request(server).post('/api/v1/categories')
        .set('Authorization', 'bearer ' + token).send({ name })
    }

    beforeEach(() => {
      token = new User({ _id: mongoose.Types.ObjectId(), isAdmin: true })
        .generateAuthToken()
      name = 'Category 1'
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

    it('should return a 400 if category is invalid', async () => {
      name = ''
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('should save the category if it is valid', async () => {
      await exec()
      const category = await Category.find({ name })
      expect(category).not.toBeNull()
    })

    it('should return the category if it is valid', async () => {
      const res = await exec()
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name', name)
    })

  })
})