const request = require('supertest')

const app = require('../src/app')
const {
  saveProduct,
  getProducts,
  getProductByUid,
  updateProductByUid,
} = require('../src/data/product-data')

jest.mock('../src/data/product-data')

afterEach(() => {
  saveProduct.mockClear()
  getProducts.mockClear()
  getProductByUid.mockClear()
  updateProductByUid.mockClear()
})

describe('products unit tests', () => {
  test('POST /products', async () => {
    saveProduct.mockReturnValueOnce(
      Promise.resolve({
        name: 'fake',
        size: 1,
        description: 'this is a test',
        _id: 'abc',
      })
    )

    const response = await request(app)
      .post('/products')
      .send({
        name: 'fake',
        size: 1,
        description: 'this is a test',
      })
      .expect(201)

    expect(response.body).toEqual({
      productStored: {
        name: 'fake',
        size: 1,
        description: 'this is a test',
        _id: 'abc',
      },
    })
  })

  test('GET /products', async () => {
    getProducts.mockReturnValueOnce([])

    const response = await request(app).get('/products').expect(200)

    expect(response.body).toEqual({ products: [] })
  })

  test('GET /products/:uid', async () => {
    getProductByUid.mockReturnValueOnce({
      name: 'fake',
      size: 1,
      description: 'this is a test',
      _id: 'abc',
    })

    const response = await request(app).get('/products/abc').expect(200)

    expect(getProductByUid).toHaveBeenCalledWith({ uid: 'abc' })
    expect(response.body).toEqual({
      product: {
        name: 'fake',
        size: 1,
        description: 'this is a test',
        _id: 'abc',
      },
    })
  })

  test.only('PUT /products', async () => {
    updateProductByUid.mockReturnValueOnce(
      Promise.resolve({
        name: 'updated',
        size: 10,
        description: 'pass',
        _id: 'abc',
      })
    )

    const response = await request(app)
      .put('/products/abc')
      .send({
        name: 'updated',
        size: 10,
        description: 'pass',
      })
      .expect(200)

    expect(updateProductByUid).toHaveBeenCalledWith(
      { uid: 'abc' },
      {
        name: 'updated',
        size: 10,
        description: 'pass',
      }
    )

    expect(response.body).toEqual({
      productUpdated: {
        name: 'updated',
        size: 10,
        description: 'pass',
        _id: 'abc',
      },
    })
  })
})
