import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: false })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
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

const Thought = mongoose.model('Thought', {
  message: String
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({accessToken: req.header('Authorization')})
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({loggedOut: true})
  }
}

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find()
  res.json(thoughts)
})

app.post('/users', async (req, res) => {
  const { username, email, password } = req.body

  try {  
    const salt = bcrypt.genSaltSync()

    const user = new User({
      username, 
      email, 
      password: bcrypt.hashSync(password, salt)
    })
    user.save()
    res.status(201).json({id: user._id, username: user.username, accessToken: user.accessToken})
  } catch (error) {
    res.status(400).json({message: 'Could not create user', error})
  }
})

app.get('/secrets', authenticateUser)
app.get('/secrets', (req, res) => {
  res.json({secret: 'This is a super secret message.'})
})

app.get('/sessions', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({email: email})

  if (user && bcrypt.compareSync(password, password)) {
    res.json({userId: user._id, accessToken: user.accessToken})
  } else {
    res.json({notFound: true})
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
