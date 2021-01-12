import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise


// think about validations during user creation t.ex: email, password constraings
// frontend: require almost all fields in order to submit form
const User = mongoose.model('User', {
  name: {
    // where name is the username
    type: String,
    unique: true,
    minlength: 2,
    maxlength: 20,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

// Defines the port the app will run on. Defaults to 8080.
//  currently running on 9000
//   PORT=9000 npm start
const port = process.env.PORT || 8081
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Middleware to authenticate the user
const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization')
    })
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({ loggedOut: true, message: 'Please try logging in again' })
    }
  } catch (err) {
    res.status(403).json({ message: 'Access token is missing or wrong', errors: err.errors })
  }
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Henrike and Peggys working area. Under construction.')
})

// Registration
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    // do we want to move this to be global?
    const user = await new User({
      name, 
      email,
      password: bcrypt.hashSync(password, salt),
    }).save()
    res.status(201).json({ userID: user._id, accessToken: user.accessToken})
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err.errors })
  }
})

// Login
app.post('/sessions', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ userId: user._id, accessToken: user.accessToken })
    } else {
      res.status(404).json({ notFound: true })
    }
  } catch (err) {
    res.status(404).json({ notFound: true })
  }
})

// Secure endpoint
app.get('/users/:id', authenticateUser)
app.get('/users/:id', (req, res) => {
  res.status(501).send()
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})