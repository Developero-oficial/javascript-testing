const express = require('express')

const { saveProduct } = require('../data/product-data')

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

module.exports.productRoutes = productRoutes
