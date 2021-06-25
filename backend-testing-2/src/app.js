const express = require('express')
const pino = require('pino-http')()

const { productRoutes } = require('./routes/product-routes')

const app = express()

app.use(pino)
app.use(express.json())

app.use(productRoutes)

module.exports = app
