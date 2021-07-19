const request = require('supertest')

const app = require('../../src/app')
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
    const response = await request(app).post('/signin').expect(200)

    expect(response.body.message).toBe('success')
  })
})
