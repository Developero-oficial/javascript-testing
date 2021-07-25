import {http} from './http'

export const getProductsService = () => {
  return http.get('/products')
}

export const saveProductService = ({name, size, description}) => {
  return http.post('/products', {name, size, description})
}
