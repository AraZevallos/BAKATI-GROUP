const request = require('supertest')
const mongoose = require('mongoose')
const { User } = require('../../models/user')

let server
describe('Categories', () => {

  beforeEach(() => { server = require('../../bin/www') })
  afterEach(async () => { await server.close(); await User.deleteMany({}) })

  describe('GET /users/', () => {

    let token
    const exec = async () => {
      return await request(server).get('/api/v1/users')
        .set('Authorization', 'bearer ' + token)
    }

    beforeEach(async () => {
      token = new User({ _id: mongoose.Types.ObjectId(), isAdmin: true })
        .generateAuthToken()
    })

    it('should return a 401 if no token is provided', () => { token = '' }, async () => {
      const res = await exec()
      expect(res.status).toBe(401)
    })

    it('should return 200 if token is provided', async () => {
      const res = await exec()
      expect(res.status).toBe(200)
    })

    it('should return all users', async () => {
      const users = [
        { name: 'access1', email: 'access1', password: 'access1', phone: '982987654', isAdmin: true },
        { name: 'access2', email: 'access2', password: 'access2', phone: '982987654', isAdmin: true }]
      await User.insertMany(users)
      const res = await exec()
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
      expect(res.body.some(u => u.name === 'access1')).toBeTruthy()
      expect(res.body.some(u => u.name === 'access2')).toBeTruthy()
    })
  })

  describe('GET /users/:id', () => {
    let token, user, id
    const exec = async () => {
      return await request(server).get('/api/v1/users/' + id)
        .set('Authorization', 'bearer ' + token)
    }

    beforeEach(async () => {
      user = new User({ name: 'access1', email: 'access1', password: 'access1', phone: '982987654', isAdmin: true })
      await user.save()
      id = user._id
      token = user.generateAuthToken()
    })

    it('should return a 401 if no token is provided', () => { token = '' }, async () => {
      const res = await exec()
      expect(res.status).toBe(401)
    })

    it('should return a 200 if the user is found', async () => {
      const res = await exec()
      expect(res.status).toBe(200)
    })

    it('should return a 404 if the user is not found', async () => {
      id = mongoose.Types.ObjectId()
      const res = await exec()
      expect(res.status).toBe(404)
    })

    it('should return the user if the user is found', async () => {
      const res = await exec()
      expect(res.body).toHaveProperty('name', user.name)
      expect(res.body).toHaveProperty('email', user.email)
      expect(res.body).toHaveProperty('phone', user.phone)
      expect(res.body).toHaveProperty('isAdmin', user.isAdmin)
    })
  })

  describe('POST /users/', () => {

    let token, user
    const exec = async () => {
      return await request(server).post('/api/v1/users')
        .set('Authorization', 'bearer ' + token).send(user)
    }

    beforeEach(async () => {
      token = new User({ _id: mongoose.Types.ObjectId(), isAdmin: true })
        .generateAuthToken()
      user = { name: 'access1', email: 'access1', password: 'access1', phone: '982987654', isAdmin: true }
    })

    it('should return a 401 if no token is provided', () => { token = '' }, async () => {
      const res = await exec()
      expect(res.status).toBe(401)
    })

    it('should return a 400 if the user is malformed', async () => {
      user = { name: 'access1' }
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('should return a 201 if the user is created', async () => {
      const res = await exec()
      expect(res.status).toBe(201)
    })

    it('should return the user if the user is created', async () => {
      const res = await exec()
      expect(res.body).toHaveProperty('name', user.name)
      expect(res.body).toHaveProperty('email', user.email)
      expect(res.body).toHaveProperty('phone', user.phone)
      expect(res.body).toHaveProperty('isAdmin', user.isAdmin)
    })
  })

  describe('PUT /users/:id', () => {

    let token, user, id
    const exec = async () => {
      return await request(server).put('/api/v1/users/' + id)
        .set('Authorization', 'bearer ' + token).send(user)
    }

    beforeEach(async () => {
      let tempUser = new User({ name: 'access1', email: 'access1', password: 'access1', phone: '982987654', isAdmin: true })
      await tempUser.save()
      token = tempUser.generateAuthToken()
      id = tempUser._id
      user = { name: 'access2', email: 'access2', phone: '982987655' }
    })

    it('should return a 401 if no token is provided', () => { token = '' }, async () => {
      const res = await exec()
      expect(res.status).toBe(401)
    })

    it('should return a 400 if the user is malformed', async () => {
      user = { name: 'access2' }
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('should return a 404 if the user is not found', async () => {
      id = mongoose.Types.ObjectId()
      const res = await exec()
      expect(res.status).toBe(404)
    })

    it('should return a 200 if client is logged in and admin', async () => {
      const res = await exec()
      expect(res.status).toBe(200)
    })

    it('should update the user if it is valid', async () => {
      await exec()
      const userInDb = await User.findById(id)
      expect(userInDb).not.toBeNull()
      expect(userInDb.name).toBe(user.name)
    })

    it('should return the user if the user is updated', async () => {
      const res = await exec()
      expect(res.body).toHaveProperty('name', user.name)
      expect(res.body).toHaveProperty('email', user.email)
      expect(res.body).toHaveProperty('phone', user.phone)
    })
  })

  describe('DELETE /users/:id', () => {

    let token, id
    const exec = async () => {
      return await request(server).delete('/api/v1/users/' + id)
        .set('Authorization', 'bearer ' + token)
    }

    beforeEach(async () => {
      let tempUser = new User({ name: 'access1', email: 'access1', password: 'access1', phone: '982987654', isAdmin: true })
      await tempUser.save()
      token = tempUser.generateAuthToken()
      id = tempUser._id
    })

    it('should return a 401 if no token is provided', () => { token = '' }, async () => {
      const res = await exec()
      expect(res.status).toBe(401)
    })

    it('should return a 404 if the user is not found', async () => {
      id = mongoose.Types.ObjectId()
      const res = await exec()
      expect(res.status).toBe(404)
    })

    it('should return a 400 if the user is not found', async () => {
      id = '1'
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('should return a 200 if the user is found', async () => {
      const res = await exec()
      expect(res.status).toBe(200)
    })

    it('should delete the user if the user is found', async () => {
      await exec()
      const userInDb = await User.findById(id)
      expect(userInDb).toBeNull()
    })
  })

})