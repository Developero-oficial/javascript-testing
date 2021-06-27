const express = require('express')

const {
  saveProductController,
  getProductsController,
  getProductByUidController,
  updateProductByUidController,
  deleteProductByUidController,
} = require('../controllers/product-controllers')

const { validateRequiredValues } = require('../middlewares/product-middlewares')

const productRoutes = express.Router()

productRoutes.post('/products', validateRequiredValues, saveProductController)

productRoutes.get('/products', getProductsController)

productRoutes.get('/products/:uid', getProductByUidController)

productRoutes.put('/products/:uid', updateProductByUidController)

productRoutes.delete('/products/:uid', deleteProductByUidController)

module.exports.productRoutes = productRoutes
