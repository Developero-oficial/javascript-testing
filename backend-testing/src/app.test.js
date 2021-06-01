const request = require('supertest')
const app = require('./app')

describe('users', () => {
  test('should store a user', async () => {
    const result = await request(app)
      .post('/users')
      .send({ name: 'john', address: 'fake address', age: '20', uid: 'abc' })
      .set('Accept', 'application/json')
      .expect(201)

    expect(result.body).toEqual({ message: 'success' })
  })

  test('should get all users', async () => {
    const result = await request(app).get('/users').expect(200)

    expect(result.body).toEqual([])
  })
})
