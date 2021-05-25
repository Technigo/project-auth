import express from 'express'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
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

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({ message: 'Not authorized' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error });
  }
} 

const port = process.env.PORT || 8080
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Endpoints
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/session', authenticateUser)
app.get('/session', (req, res) => {
  const axios = require('axios')

  const config = {
    method: 'get',
    url: 'https://api.thecatapi.com/v1/images/search',
    headers: {
      'x-api-key': '0f2ac4bc-3fb8-4532-8d82-398268850e58',
      'content-type': 'application/json; charset=utf-8',
    }
  }
  axios(config)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => res.send(err))
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt)
     }).save()

    res.json({
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken 
     })
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error})
  }
})

app.post('/signin', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({username})
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        userID: user._id,
        username: user.username, 
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ message: 'User not found'})
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error})
  }

})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
