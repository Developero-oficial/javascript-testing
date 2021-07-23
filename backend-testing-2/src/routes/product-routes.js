const express = require('express')

const {
  saveProductController,
  getProductsController,
  getProductByUidController,
  updateProductByUidController,
  deleteProductByUidController,
} = require('../controllers/product-controllers')

const { isAuthHandler } = require('../middlewares/auth-middleware')

const {
  validateRequiredValues,
  validateUid,
} = require('../middlewares/product-middlewares')

const productRoutes = express.Router()

productRoutes.post('/products', validateRequiredValues, saveProductController)

productRoutes.get('/products', [isAuthHandler], getProductsController)

productRoutes.get('/products/:uid', validateUid, getProductByUidController)

productRoutes.put('/products/:uid', [
  validateUid,
  validateRequiredValues,
  updateProductByUidController,
])

productRoutes.delete(
  '/products/:uid',
  validateUid,
  deleteProductByUidController
)

module.exports.productRoutes = productRoutes
