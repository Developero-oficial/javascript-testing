const {
  saveProduct,
  getProducts,
  getProductByUid,
  updateProductByUid,
  deleteProductByUid,
} = require('../data/product-data')

module.exports.saveProductController = async (req, res) => {
  const { name, size, description } = req.body

  const productStored = await saveProduct({
    name,
    size,
    description,
  })

  res.status(201).send({ productStored })
}

module.exports.getProductsController = async (req, res, next) => {
  try {
    const products = await getProducts()
    res.status(200).send({ products })
  } catch (e) {
    next(e)
  }
}

module.exports.getProductByUidController = async (req, res) => {
  const { uid } = req.params

  const product = await getProductByUid({ uid })
  res.status(200).send({ product })
}

module.exports.updateProductByUidController = async (req, res) => {
  const { uid } = req.params

  const { name, size, description } = req.body

  const productUpdated = await updateProductByUid(
    { uid },
    { name, size, description }
  )
  res.status(200).send({ productUpdated })
}

module.exports.deleteProductByUidController = async (req, res) => {
  const { uid } = req.params

  const productRemoved = await deleteProductByUid({ uid })
  res.status(200).send({ productRemoved })
}
