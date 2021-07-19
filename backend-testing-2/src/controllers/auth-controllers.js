module.exports.signin = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' })
  }

  res.status(200).send({ message: 'success' })
}

module.exports.login = (req, res) => {}
