const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const request = require('supertest')

const app = require('../src/app')
const { connectDb } = require('../src/db/mongo')
const { buildProduct } = require('../__fixtures__/product-fixtures')

let mongoServer

beforeAll(async () => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()
  await connectDb({ uri: mongoUri })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany()
  }
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('products integration tests', () => {
  test('POST /products', async () => {
    const product = buildProduct()

    const response = await request(app)
      .post('/products')
      .send({
        name: product.name,
        size: product.size,
        description: product.description,
      })
      .expect(201)

    const { name, size, description, _id } = response.body.productStored

    expect(name).toBe(product.name)
    expect(size).toBe(product.size)
    expect(description).toBe(product.description)
    expect(_id).toBeTruthy()
  })

  test('GET /products empty values', async () => {
    const response = await request(app).get('/products').expect(200)

    expect(response.body).toEqual({ products: [] })
  })

  test('GET /products with values', async () => {
    const product = buildProduct()

    const responsePost = await request(app)
      .post('/products')
      .send({
        name: product.name,
        size: product.size,
        description: product.description,
      })
      .expect(201)

    const { name, size, description, _id, __v } =
      responsePost.body.productStored

    const responseGet = await request(app).get('/products').expect(200)

    expect(responseGet.body).toEqual({
      products: [{ name, size, description, _id, __v }],
    })
  })
})
