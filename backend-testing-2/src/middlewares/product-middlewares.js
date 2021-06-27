const mongoose = require('mongoose')

module.exports.validateRequiredValues = (req, res, next) => {
  const { name, size, description } = req.body

  if (!name || !size || !description) {
    res.status(400).send({ message: 'name, size and description are required' })
    return
  }

  next()
}

module.exports.validateUid = (req, res, next) => {
  const { uid } = req.params

  if (!mongoose.Types.ObjectId.isValid(uid)) {
    res.status(400).send({ message: `the ${uid} is invalid` })
    return
  }

  next()
}
