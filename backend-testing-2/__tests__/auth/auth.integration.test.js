const request = require('supertest')

const app = require('../../src/app')
const { createUser } = require('../../src/data/user-data')
const { connectDb, createUri, closeDb, cleanDb } = require('../../src/db/mongo')

beforeAll(async () => {
  const mongoUri = await createUri()
  await connectDb({ uri: mongoUri })
})

beforeEach(async () => {
  await cleanDb()
})

afterAll(async () => {
  await closeDb()
})

describe('auth integration tests', () => {
  test('success signin', async () => {
    const response = await request(app)
      .post('/signin')
      .send({
        email: 'john.doe@mail.com',
        password: '123456789',
      })
      .expect(200)

    expect(response.body.message).toBe('success')
  })

  test('required email and password fields', async () => {
    const response = await request(app).post('/signin').expect(400)

    expect(response.body.message).toBe('Email and password are required')
  })

  test('validate if email already exists', async () => {
    const email = 'john.doe@mail.com'
    const password = '123456789'

    await createUser({ email, password })

    const response = await request(app)
      .post('/signin')
      .send({
        email,
        password,
      })
      .expect(400)

    expect(response.body.message).toBe('user already exists')
  })
})
