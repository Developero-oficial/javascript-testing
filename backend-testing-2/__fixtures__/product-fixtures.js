module.exports.buildProduct = ({
  name = 'fake',
  size = 1,
  description = 'this is a test',
  _id = 'abc',
} = {}) => ({
  name,
  size,
  description,
  _id,
})
