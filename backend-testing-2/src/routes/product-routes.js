const express = require('express')

const {
  saveProduct,
  getProducts,
  getProductByUid,
} = require('../data/product-data')

const productRoutes = express.Router()

productRoutes.post('/products', async (req, res) => {
  const { name, size, description } = req.body

  const productStored = await saveProduct({
    name,
    size,
    description,
  })

  res.status(201).send({ productStored })
})

productRoutes.get('/products', async (req, res) => {
  const products = await getProducts()
  res.status(200).send({ products })
})

productRoutes.get('/products/:uid', async (req, res) => {
  const { uid } = req.params

  const product = await getProductByUid({ uid })
  res.status(200).send({ product })
})

module.exports.productRoutes = productRoutes
