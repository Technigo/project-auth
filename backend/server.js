import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { isEmail } from 'validator'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

//_________Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 20,
  },
  password: {
    type: String,
    required: [true, 'a password is required'],
    minLength: 5,
    // validate: [ isStrongPassword , 'this is not strong']
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: [isEmail, 'invalid email']
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

userSchema.pre('save', async function (next) {
  const user = this
  // isModified: "Returns true if any of the given paths is modified, else false. 
  // If no arguments, returns true if any path in this document is modified."
  // https://mongoosejs.com/docs/api.html#document_Document-isModified
  if (!user.isModified('password')) {
    return next()
  }
  const salt = bcrypt.genSaltSync(10)
  // Hash the password – this happens after the validation.
  user.password = bcrypt.hashSync(user.password, salt)
  next()
})

//_________Model
const User = mongoose.model('User', userSchema)


//_________Defines port 
const port = process.env.PORT || 8080
const app = express()

//_________Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//_________Error message if server is down
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).send({ error: 'service unavailable' })
  }
})

//_________middlewear to authenticate User
const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization'),
    })

    if (user) {
      req.user = user
      next()
    } else {
      res
        .status(401)
        .json({ loggedOut: true, message: 'Please try logging in again' })
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: 'Access token is missing or wrong', errors: err })
  }
}

//_________GET list of endpoints
const listEndpoints = require('express-list-endpoints')
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

//_________POST create user
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await new User({ name, email, password }).save()
    res.status(201).json({ userId: user._id, userName: user.name, accessToken: user.accessToken })
  } catch (err) {
    res.status(400).json({
      message: 'Could not create user', errors: {
        message: err.message,
        error: err,
      },
    })
  }
})

//_________Secure endpoint, user needs to be logged in to access this.
app.get('/users/:id/secret', authenticateUser)

//_________POST secretMessage
app.get('/users/:id/secret', (req, res) => {
  const secretMessage = `${req.user.name}, this was totally worth all your effort - right?`
  res.status(201).json(secretMessage)
})

//_________POST Log in user endpoint (POST)
app.post('/login', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findOne({ name, email })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ userId: user._id, userName: user.name, accessToken: user.accessToken })
    } else {
      res.status(404).json({ notFound: true })
    }
  } catch (err) {
    res.status(404).json({ notFound: true })
  }
})

//_________Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
