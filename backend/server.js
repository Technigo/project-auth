import express from 'express'
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
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const Secret = mongoose.model('Secret', {
  message: {
    type: String,
    required: true
  }
})

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error })
  }
}
const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/secrets', authenticateUser)
app.get('/secrets', async (req, res) => {
  const secrets = await Secret.find()
  res.json({ success: true, secrets })
})

app.post('/secrets', authenticateUser)
app.post('/secrets', async (req, res) => {
  const { message } = req.body

  try {
    const newSecret = await new Secret({
      message
    }).save()

    res.json({ success: true, newSecret })
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error })
  }
})

app.post('/users', async (req, res) => {
  const { username, password, email } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username,
      email,
      password: bcrypt.hashSync(password, salt)
    }).save()

    res.json({
      success: true,
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken
    })
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error })
  }
})

app.post('/sessions', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userID: user._id,
        username: user.username,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (error) {
    res.status(404).json({ success: false, message: 'Invalid request', error: error })
  }
})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
