const express = require('express')

const { createUser } = require('../data/user-data')
const { saveProduct } = require('../data/product-data')
const { cleanDb } = require('../db/mongo')

const seedRoutes = express.Router()

const handlersDict = {
  users: createUser,
  products: saveProduct,
}

seedRoutes.post('/seed', async (req, res) => {
  try {
    const { schema, collectionData } = req.body

    const handler = handlersDict[schema]

    if (!handler) {
      return res
        .status(400)
        .send({ message: `The schema ${schema} does not exists` })
    }

    for (let i = 0; i < collectionData.length; i++) {
      const singleData = collectionData[i]
      const result = await handler(singleData)

      console.log(result)
    }

    return res.status(201).send({ message: 'success' })
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

seedRoutes.delete('/collections', async (req, res) => {
  try {
    await cleanDb()
    res.status(200).send({ message: 'success' })
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

module.exports.seedRoutes = seedRoutes
