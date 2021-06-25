const request = require('supertest')

const app = require('../src/app')
const { saveProduct } = require('../src/data/product-data')

jest.mock('../src/data/product-data')

afterEach(() => {
  saveProduct.mockClear()
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
})
