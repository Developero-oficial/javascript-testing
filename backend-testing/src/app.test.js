const request = require('supertest')
const app = require('./app')

describe('users', () => {
  it('should store a user', async () => {
    const result = await request(app)
      .post('/users')
      .send({ name: 'john', address: 'fake address', age: '20', uid: 'abc' })
      .set('Accept', 'application/json')
      .expect(201)

    expect(result.body).toEqual({ message: 'success' })
  })
})
