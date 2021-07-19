const { findUserByEmail, createUser } = require('../data/user-data')

module.exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Email and password are required' })
    }

    const user = await findUserByEmail({ email })

    if (user) {
      return res.status(400).send({ message: 'user already exists' })
    }

    await createUser({ email, password })

    res.status(200).send({ message: 'success' })
  } catch (e) {
    res.status(500).send({ message: 'There was an unexpected error' })
  }
}

module.exports.login = (req, res) => {}
