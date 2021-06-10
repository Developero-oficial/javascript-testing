const { addUser, getUsers } = require('./users')
const { buildUser } = require('../__fixtures__/users')

test('should add new user', () => {
  const user = buildUser()
  addUser(user)
  expect(getUsers()).toEqual([user])
})
