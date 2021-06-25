const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
  name: String,
  size: Number,
  description: String,
})

module.exports = mongoose.model('products', productSchema)
