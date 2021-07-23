const request = require('supertest')

const app = require('../../src/server')
const { verify } = require('../../src/utils/jwt')
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

  test('success login', async () => {
    const email = 'john.doe@mail.com'
    const password = '123456789'

    await createUser({ email, password })

    const response = await request(app)
      .post('/login')
      .send({
        email,
        password,
      })
      .expect(200)

    const decoded = verify(response.body.token)

    expect(decoded.email).toBe(email)
  })

  test('required email and password fields for login', async () => {
    const response = await request(app).post('/login').expect(400)

    expect(response.body.message).toBe('Email and password are required')
  })

  test('validate if email already exists on login', async () => {
    const email = 'john.doe@mail.com'
    const password = '123456789'

    const response = await request(app)
      .post('/login')
      .send({
        email,
        password,
      })
      .expect(400)

    expect(response.body).toEqual({
      message: 'Email or password incorrect',
    })
  })

  test('validate if password is correct on login', async () => {
    const email = 'john.doe@mail.com'
    const password = '123456789'

    await createUser({ email, password })

    const response = await request(app)
      .post('/login')
      .send({
        email,
        password: 'incorrectPassword',
      })
      .expect(400)

    expect(response.body).toEqual({
      message: 'Email or password incorrect',
    })
  })

  test('validate protected endpoint contains Authorization header', async () => {
    const response = await request(app).get('/products').expect(403)

    expect(response.body).toEqual({
      message: 'The Authorization header was not sent',
    })
  })

  test('validate protected endpoint valid bearer', async () => {
    const response = await request(app)
      .get('/products')
      .set('Authorization', 'foo')
      .expect(403)

    expect(response.body).toEqual({
      message: 'The Authorization header does not contain Bearer',
    })
  })

  test('validate protected endpoint valid token', async () => {
    const response = await request(app)
      .get('/products')
      .set('Authorization', 'Bearer invalidToken')
      .expect(401)

    expect(response.body).toEqual({
      message: 'Invalid token authentication',
    })
  })
})
