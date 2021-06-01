module.exports.buildUser = ({
  name = 'john',
  address = 'fake address',
  age = '20',
  uid = 'abc',
} = {}) => ({
  name,
  address,
  age,
  uid,
})
