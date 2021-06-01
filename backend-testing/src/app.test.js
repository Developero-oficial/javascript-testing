const request = require('supertest')
const app = require('./app')
const { getUsers, addUser } = require('./data/users')
const { buildUser } = require('./__fixtures__/users')

jest.mock('./data/users')

beforeEach(() => {
  getUsers.mockReset()
  addUser.mockReset()
})

describe('users', () => {
  test('should store a user', async () => {
    const result = await request(app)
      .post('/users')
      .send(buildUser())
      .set('Accept', 'application/json')
      .expect(201)

    expect(result.body).toEqual({ message: 'success' })
  })

  test('should get all users', async () => {
    const user = buildUser()
    getUsers.mockReturnValue([user])
    const result = await request(app).get('/users').expect(200)

    expect(result.body).toEqual([user])
  })

  test('should get empty users when there are no users', async () => {
    getUsers.mockReturnValue([])
    const result = await request(app).get('/users').expect(200)

    expect(result.body).toEqual([])
  })
})
