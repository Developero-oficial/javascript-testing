const express = require('express')

const { saveProduct, getProducts } = require('../data/product-data')

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

module.exports.productRoutes = productRoutes
