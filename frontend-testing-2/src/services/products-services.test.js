import {getProductsService, saveProductService} from './products-services'
import {http} from './http'

jest.mock('./http')

beforeEach(() => {
  http.mockClear()
})

describe('products services', () => {
  test('getProductsService', () => {
    getProductsService()

    expect(http.get).toHaveBeenCalledWith('/products')
  })

  test('saveProductService', () => {
    const productData = {
      name: 'test',
      size: 1,
      description: 'pass',
    }

    saveProductService(productData)

    expect(http.post).toHaveBeenCalledWith('/products', productData)
  })
})
