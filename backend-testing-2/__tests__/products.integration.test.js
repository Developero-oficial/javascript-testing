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

    console.log(response.body)

    expect(name).toBe(product.name)
    expect(size).toBe(product.size)
    expect(description).toBe(product.description)
    expect(_id).toBeTruthy()
  })
})
