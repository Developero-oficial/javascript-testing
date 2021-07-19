const request = require('supertest')

const app = require('../../src/app')
const { createUser, findUserByEmail } = require('../../src/data/user-data')
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
    const email = 'john.doe@mail.com'
    const password = '123456789'

    const response = await request(app)
      .post('/signin')
      .send({
        email,
        password,
      })
      .expect(200)

    const user = await findUserByEmail({ email })

    expect(response.body.message).toBe('success')
    expect(user.email).toBe(email)
    expect(user.password).not.toBe(password)
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
