module.exports.validateRequiredValues = (req, res, next) => {
  const { name, size, description } = req.body

  if (!name || !size || !description) {
    res.status(400).send({ message: 'name, size and description are required' })
    return
  }

  next()
}
