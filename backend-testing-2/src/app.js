const express = require('express')
const pino = require('pino-http')()
const cors = require('cors')

const { productRoutes } = require('./routes/product-routes')
const { authRoutes } = require('./routes/auth-routes')
const { errorHandler } = require('./middlewares/error-handler-middlewares')

const app = express()

app.use(
  cors({
    origin: '*',
  })
)
app.use(pino)
app.use(express.json())

app.use(productRoutes)
app.use(authRoutes)

app.use(errorHandler)

module.exports = app
