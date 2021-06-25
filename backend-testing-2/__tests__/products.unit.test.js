const request = require('supertest')

const app = require('../src/app')
const {
  saveProduct,
  getProducts,
  getProductByUid,
  updateProductByUid,
  deleteProductByUid,
} = require('../src/data/product-data')
const { buildProduct } = require('../__fixtures__/product-fixtures')

jest.mock('../src/data/product-data')

afterEach(() => {
  saveProduct.mockClear()
  getProducts.mockClear()
  getProductByUid.mockClear()
  updateProductByUid.mockClear()
  deleteProductByUid.mockClear()
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

    const response = await request(app).get('/products').expect(200)

    expect(response.body).toEqual({ products: [] })
  })

  test('GET /products/:uid', async () => {
    const product = buildProduct()

    getProductByUid.mockReturnValueOnce(product)

    const response = await request(app).get('/products/abc').expect(200)

    expect(getProductByUid).toHaveBeenCalledWith({ uid: 'abc' })

    expect(response.body).toEqual({
      product,
    })
  })

  test('PUT /products', async () => {
    const product = buildProduct()

    updateProductByUid.mockReturnValueOnce(Promise.resolve(product))

    const response = await request(app)
      .put('/products/abc')
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
    const product = buildProduct({
      name: 'fake',
      size: 1,
      description: 'this is a test',
      _id: 'abc',
    })

    deleteProductByUid.mockReturnValueOnce(Promise.resolve(product))

    const response = await request(app).delete('/products/abc').expect(200)

    expect(deleteProductByUid).toHaveBeenCalledWith({ uid: 'abc' })
    expect(response.body).toEqual({
      productRemoved: product,
    })
  })
})
