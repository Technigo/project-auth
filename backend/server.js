import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  email: {
    type: String,
    unique: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const authenticateUser = async (req, res, next) => {
  try {
    // Find a user based on the access token they send in header Authorization
    const user = await User.findOne({ accessToken: req.header('Authorization') })

    // If user is found in the DB, attach the user object to the request
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({ message: 'Please try logging in again', loggedOut: true })
    }
  } catch (err) {
    res.status(403).json({ message: 'Access token is wrong or missing', errors: err })
  }
}

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', async (req, res) => {
  const users = await User.find()
  res.send(users)
})
// SIGN UP
app.post('/users', async (req, res) => {
  // Got accessTokens returned even tho a new user was not created, added if to check email.
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    // try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    user.save()
    res.status(201).json({ id: user._id, accessToken: user.accessToken })
    // } catch (err) {
  } else {
    res.status(400).json({ message: 'Could not create user', signUpSucces: false })
    // }
  }
})
// LOG IN
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.status(201).json({ message: "Sign in successful", id: user._id, accessToken: user.accessToken })
  } else {
    res.status(400).json({ message: 'Could not find user', userFound: false })
  }
})

app.get('/secrets', authenticateUser)
app.get('/secrets', (req, res) => {
  res.json({ secret: 'This is a top secret message' })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
