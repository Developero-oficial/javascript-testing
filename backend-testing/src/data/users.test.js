const {
  addUser,
  getUsers,
  findUserByUid,
  updateUserByUid,
  removeUserByUid,
} = require('./users')
const { buildUser } = require('../__fixtures__/users')

test('should add new user', () => {
  const user = buildUser()
  addUser(user)
  expect(getUsers()).toEqual([user])
})

test('findUserByUid - should return undefined when there are no users', () => {
  const user = findUserByUid({ uid: '' })
  expect(user).toBe(undefined)
})

test('findUserByUid - should return a valid user', () => {
  const user = buildUser()
  const userFound = findUserByUid({ uid: user.uid })
  expect(userFound).toEqual(user)
})

test('updateUserByUid - should update a valid user', () => {
  const user = buildUser()
  const userUpdated = { ...user, name: 'updated' }
  const usersUpdated = updateUserByUid(userUpdated)
  expect(usersUpdated).toEqual([userUpdated])
})

test('removeUserByUid - should remove a valid user', () => {
  const user = buildUser()
  addUser(user)

  const usersUpdated = removeUserByUid({ uid: user.uid })
  expect(usersUpdated).toEqual([])
})
