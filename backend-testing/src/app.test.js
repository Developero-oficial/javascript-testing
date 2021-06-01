const request = require('supertest')
const app = require('./app')
const { getUsers, addUser, updateUserByUid } = require('./data/users')
const { buildUser } = require('./__fixtures__/users')

jest.mock('./data/users')

beforeEach(() => {
  getUsers.mockReset()
  addUser.mockReset()
  updateUserByUid.mockReset()
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

  test('should update an user', async () => {
    const user = buildUser()
    updateUserByUid.mockReturnValue([user])

    const result = await request(app)
      .put(`/users/${user.uid}`)
      .send(user)
      .set('Accept', 'application/json')
      .expect(200)

    expect(result.body).toEqual([user])
  })
})
