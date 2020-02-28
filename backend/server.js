import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/newestauthAPI'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ loggedOut: true })
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
app.get('/', (req, res) => {
  res.send('Hello world! Work!')
})

//create user
app.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const newUser = await new User({
      username,
      email,
      password: bcrypt.hashSync(password)
    })
    newUser.save()
    res.status(201).json(newUser)
  } catch (err) {
    res
      .status(400)
      .json({ messsage: 'Could not create user', error: err.errors })
  }
})

// ROUTE FOR PROFILE PAGE
app.get('/memevault', authenticateUser, (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'ure logged in'
    })
  } catch (err) {
    res.status(403).json({ message: 'Not authorized', error: err.errors })
  }
})

// ROUTE FOR LOGIN
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({
      username: user.username,
      userId: user._id,
      accessToken: user.accessToken
    })
  } else {
    res.status(401).json({
      statusCode: 401,
      notFound: true,
      error: 'Login failed, username or password incorrect'
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
