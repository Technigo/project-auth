import db from '../models'

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new db.User({ name, email, password: bcrypt.hashSync(password) })
    const saved = await user.save()
    res.status(201).json({ saved })
  } catch (err) {
    res.status(400).json({ message: 'could not create user', error: err.errors })
  }
}

exports.getUser = async (req, res) => {
  const user = await db.User.findById(req.params.id)
  res.json({ secret: `Welcome to the Jungle!! ${user.name}` })
}