const request = require('supertest')
const app = require('./app')
const { getUsers, addUser } = require('./data/users')

jest.mock('./data/users')

beforeEach(() => {
  getUsers.mockReset()
  addUser.mockReset()
})

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
    getUsers.mockReturnValue([])
    const result = await request(app).get('/users').expect(200)

    expect(result.body).toEqual([])
  })
})
