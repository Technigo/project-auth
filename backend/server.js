import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/project-mongo'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Codealong with Van
const User = mongoose.model('User', {
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
}

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello Technigo!')
})

////// Codealong with Van
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body
    //do not store plain text password, always use bcrypt or alternative
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    user.save()
    res.status(201).json({ id: user.id, accessToken: user.accessToken })
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Could not create user', errors: err.errors })
  }
})

app.get('/secrets', (req, res) => {
  res.json({ secret: 'This is a secret message' })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
