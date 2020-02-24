import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

// const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/auth'
const mongoUrl = process.env.MONGO_URL || 'mongodb://https://pb-auth-api.herokuapp.com/users
// const mongoUrl = process.env.MONGO_URL || 'https://pb-auth-api.herokuapp.com/users'
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
//   PORT=9000 npm start
const port = process.env.PORT || 9000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization')
    })
    user.password = undefined // so password is not returned
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({ loggedOut: true, message: "please try to login again" })
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: 'access token missing or wrong', errors: err.message })
  }
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world hej hej')
})

// creating a user - sign up / name passw will be struct from req.body below//
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    const saved = await user.save()
    res.status(201).json(saved)
    // res.json({ id: user._id, accessToken: user.accessToken })
  } catch (err) {
    console.error(err.message)
    res
      .status(400)
      .json({ message: 'Error! could not create user', errors: err.message })
    // .json({ message: 'could not create user', error: err.errors })
  }
})

//secure endpoint, user needs to be logged in to acces this
app.get('/users/:id', authenticateUser)
app.get('/users/:id', (req, res) => {
  try {
    res.status(201).json(req.user)
  } catch (err) {
    res.status(400).json({ message: 'could not save user', errors: err.message })
    // res.send('BARBASTARK')
  }
})
// secrets = user id ( what shows when logged it )
// app.get('/secrets', authenticateUser)
// app.get('/secrets', (req, res) => {
//   res.json({ secret: 'This is secret message' })
// })

// when user/member sign in 
app.post('/sessions', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }) // retrieve user, cn use name too, change in const above in that case 
    if (user && bcrypt.compareSync(password, user.password)) { //comparing passwords
      //success
      res.status(201).json({ userId: user._id, accessToken: user.accessToken })
    } else {
      //failure
      res.json({ message: 'wrong username or password' })
    }
  } catch (err) {
    res.status(400).json({ errors: err.errors })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
