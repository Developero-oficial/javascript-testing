const request = require('supertest')

const app = require('../src/app')
const { connectDb, createUri, closeDb, cleanDb } = require('../src/db/mongo')
const { saveProduct } = require('../src/data/product-data')
const { buildProduct } = require('../__fixtures__/product-fixtures')

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

    const productStored = await saveProduct(product)

    const { name, size, description, _id, __v } = productStored

    const responseGet = await request(app).get('/products').expect(200)

    expect(responseGet.body).toEqual({
      products: [{ name, size, description, _id: String(_id), __v }],
    })
  })

  test('GET /products/:uid empty value', async () => {
    const response = await request(app)
      .get('/products/60d78bd12ce9f068ea3ce48f')
      .expect(200)

    expect(response.body).toEqual({
      product: null,
    })
  })

  test('GET /products/:uid with value', async () => {
    const product = buildProduct()

    const productStored = await saveProduct(product)

    const { name, size, description, _id, __v } = productStored

    const response = await request(app).get(`/products/${_id}`).expect(200)

    expect(response.body).toEqual({
      product: { name, size, description, _id: String(_id), __v },
    })
  })

  test('PUT /products', async () => {
    const product = buildProduct()

    const productStored = await saveProduct(product)

    const { _id, __v } = productStored

    const newProductValues = {
      name: 'this is a new name',
      size: 100,
      description: 'test pass',
    }

    const response = await request(app)
      .put(`/products/${_id}`)
      .send(newProductValues)
      .expect(200)

    expect(response.body).toEqual({
      productUpdated: {
        ...newProductValues,
        _id: String(_id),
        __v,
      },
    })
  })

  test('DELETE /products/:uid', async () => {
    const product = buildProduct()

    const productStored = await saveProduct(product)

    const { _id } = productStored

    const response = await request(app).delete(`/products/${_id}`).expect(200)

    console.log(response.body)

    expect(response.body.productRemoved.deletedCount).toBe(1)
  })
})
