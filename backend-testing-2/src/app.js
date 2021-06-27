const express = require('express')
const pino = require('pino-http')()

const { productRoutes } = require('./routes/product-routes')
const { errorHandler } = require('./middlewares/error-handler-middlewares')

const app = express()

app.use(pino)
app.use(express.json())

app.use(productRoutes)

app.use(errorHandler)

module.exports = app
