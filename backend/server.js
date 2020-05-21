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


const newUser = new User({ name: "hanna", email: "hannasEmail", password: bcrypt.hashSync("hanna") })
newUser.save()

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization')

    })
    console.log(req.header('Authorization'))
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({ loggedOut: true, message: "Please try logging in again" })
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: 'access token missing or wrong', errors: err.errors })
  }
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})
app.get('/users', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const { name, password, email } = req.body
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    const saved = await user.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: 'Could not save user 1', errors: err.errors })
  }
})

app.get('/users/:id', authenticateUser)
app.get('/users/:id', (req, res) => {
  try {
    res.status(201).json(req.user)
  } catch (err) {
    res.status(400).json({ message: 'could not save user 2', errors: err.errors })
  }
})

app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ name: req.body.name })

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken })
  } else {
    res.json({ notFound: true })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

