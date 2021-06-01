const express = require('express')
const pino = require('pino-http')()
const {
  getUsers,
  addUser,
  findUserByUid,
  updateUserByUid,
  removeUserByUid,
} = require('./data/users')

const app = express()

app.use(pino)
app.use(express.json())

const router = express.Router()

router.post('/users', (req, res) => {
  const { name, address, age, uid } = req.body

  addUser({ name, address, age, uid })
  return res.status(201).send({ message: 'success' })
})

router.get('/users', (req, res) => {
  return res.status(200).send(getUsers())
})

router.get('/users/:uid', (req, res) => {
  const { uid } = req.params
  const user = findUserByUid({ uid })
  return res.status(200).send(user)
})

router.put('/users/:uid', (req, res) => {
  const { name, address, age } = req.body
  const { uid } = req.params

  const usersUpdated = updateUserByUid({ name, address, age, uid })

  return res.status(200).send(usersUpdated)
})

router.delete('/users/:uid', (req, res) => {
  const { uid } = req.params
  const usersUpdated = removeUserByUid({ uid })
  return res.status(200).send(usersUpdated)
})

app.use(router)

module.exports = app
