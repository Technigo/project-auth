import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise
mongoose.set('useCreateIndex', true)

const User = mongoose.model('User', {
  name: { // use min and maxlength?
    type: String,
    unique: true,
    required: true
  },
  password: { // use min and maxlength, maybe have a couple of numbers?
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8081
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ accessToken: req.header('Authorization') })
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({ loggedOut: true, message: 'Please try and log in again' })
    }
  } catch (err) {
    res.status(403).json({ message: 'Access token is missing or not valid', errors: err })
  }
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Endpoint that creates a new user
app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const user = await new User({ name, password: bcrypt.hashSync(password, salt) }).save()
    res.status(201).json({ userId: user._id, accessToken: user.accessToken })
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err })
  }
})

// Endpoint that creates a login
app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ userId: user._id, accessToken: user.accessToken })
    } else {
      res.status(404).json({ notFound: true })
    }
  } catch (err) {
    res.status(404).json({ message: 'Could not log in user', errors: err })
  }
})

// Endpoint that shows a page to the user when logged in
// update endpoints to /users/:id/settings
app.get('/secrets', authenticateUser)
app.get('/secrets', (req, res) => {
  const secretMessage = `This is a secret message for ${req.user.name}`
  res.status(201).json({ secretMessage })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
