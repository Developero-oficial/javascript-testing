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

module.exports.getProductByUid = ({ uid }) => Product.findById(uid).exec()

module.exports.updateProductByUid = ({ uid }, data) =>
  Product.findOneAndUpdate({ _id: uid }, data, { new: true })

module.exports.deleteProductByUid = ({ uid }) => Product.deleteOne({ _id: uid })
