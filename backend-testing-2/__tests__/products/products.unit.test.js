const request = require('supertest')

const app = require('../../src/app')
const {
  saveProduct,
  getProducts,
  getProductByUid,
  updateProductByUid,
  deleteProductByUid,
} = require('../../src/data/product-data')
const { buildProduct } = require('../../__fixtures__/product-fixtures')
const { verify } = require('../../src/utils/jwt')

jest.mock('../../src/data/product-data')
jest.mock('../../src/utils/jwt')

afterEach(() => {
  saveProduct.mockClear()
  getProducts.mockClear()
  getProductByUid.mockClear()
  updateProductByUid.mockClear()
  deleteProductByUid.mockClear()
  verify.mockClear()
})

describe('products unit tests', () => {
  test('POST /products', async () => {
    const product = buildProduct()

    saveProduct.mockReturnValueOnce(Promise.resolve(product))

    const response = await request(app)
      .post('/products')
      .send({
        name: product.name,
        size: product.size,
        description: product.description,
      })
      .expect(201)

    expect(response.body).toEqual({
      productStored: product,
    })
  })

  test('GET /products', async () => {
    getProducts.mockReturnValueOnce([])
    verify.mockReturnValueOnce({})

    const response = await request(app)
      .get('/products')
      .set('Authorization', 'Bearer myToken')
      .expect(200)

    expect(response.body).toEqual({ products: [] })
  })

  test('GET /products/:uid', async () => {
    const product = buildProduct()

    getProductByUid.mockReturnValueOnce(product)

    const response = await request(app)
      .get(`/products/${product._id}`)
      .expect(200)

    expect(getProductByUid).toHaveBeenCalledWith({ uid: product._id })

    expect(response.body).toEqual({
      product,
    })
  })

  test('PUT /products', async () => {
    const product = buildProduct()

    updateProductByUid.mockReturnValueOnce(Promise.resolve(product))

    const response = await request(app)
      .put(`/products/${product._id}`)
      .send({
        name: product.name,
        size: product.size,
        description: product.description,
      })
      .expect(200)

    expect(updateProductByUid).toHaveBeenCalledWith(
      { uid: product._id },
      {
        name: product.name,
        size: product.size,
        description: product.description,
      }
    )

    expect(response.body).toEqual({
      productUpdated: product,
    })
  })

  test('DELETE /products/:uid', async () => {
    const product = buildProduct()

    deleteProductByUid.mockReturnValueOnce(Promise.resolve(product))

    const response = await request(app)
      .delete(`/products/${product._id}`)
      .expect(200)

    expect(deleteProductByUid).toHaveBeenCalledWith({ uid: product._id })
    expect(response.body).toEqual({
      productRemoved: product,
    })
  })

  test('POST /products validations', async () => {
    const response = await request(app).post('/products').expect(400)

    expect(response.body).toEqual({
      message: 'name, size and description are required',
    })
  })

  test('GET /products/:uid validation of the uid', async () => {
    const invalidUid = 'abc'
    const response = await request(app)
      .get(`/products/${invalidUid}`)
      .expect(400)

    expect(response.body).toEqual({
      message: `the ${invalidUid} is invalid`,
    })
  })

  test('PUT /products validate uid', async () => {
    const invalidUid = 'abc'

    const response = await request(app)
      .put(`/products/${invalidUid}`)
      .expect(400)

    expect(response.body).toEqual({
      message: `the ${invalidUid} is invalid`,
    })
  })

  test('PUT /products validate required values', async () => {
    const product = buildProduct()

    const response = await request(app)
      .put(`/products/${product._id}`)
      .expect(400)

    expect(response.body).toEqual({
      message: 'name, size and description are required',
    })
  })

  test('DELETE /products/:uid', async () => {
    const invalidUid = 'abc'

    const response = await request(app).delete('/products/abc').expect(400)

    expect(response.body).toEqual({
      message: `the ${invalidUid} is invalid`,
    })
  })

  test('GET /products error handler', async () => {
    getProducts.mockImplementation(() => {
      throw new Error('test')
    })
    verify.mockReturnValueOnce({})

    const response = await request(app)
      .get('/products')
      .set('Authorization', 'Bearer myToken')
      .expect(500)

    expect(response.body).toEqual({ message: 'something is wrong' })
  })
})
