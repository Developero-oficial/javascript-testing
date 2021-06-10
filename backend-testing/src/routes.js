const express = require('express')

const {
  addUserController,
  getUsersController,
  findUserByUidController,
  updateUserByUidController,
  removeUserByUidController,
} = require('./controllers')

const routes = express.Router()

routes.post('/users', addUserController)

routes.get('/users', getUsersController)

routes.get('/users/:uid', findUserByUidController)

routes.put('/users/:uid', updateUserByUidController)

routes.delete('/users/:uid', removeUserByUidController)

module.exports = routes
