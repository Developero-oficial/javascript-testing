const Product = require('../models/product-model')

module.exports.saveProduct = ({ name, size, description }) => {
  const product = new Product({
    name,
    size,
    description,
  })

  return product.save()
}

module.exports.getProducts = () => Product.find().exec()
