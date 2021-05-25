import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import crypto from 'crypto'
import bcrypt from 'bcrypt'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

// model thoughts
const Thought = mongoose.model('Thought', {
  message: String
})

// model users
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

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

// list endpoints
app.get('/', (_, res) => {
  res.send(listEndpoints(app))
})

// endpoint - get request 
app.get('/thoughts', async (_, res) => {
  const thoughts = await Thought.find()
  res.json(thoughts)
})

// edpoints - post request
app.post('/thoughts', async (req, res) => {
  const { message } = req.body

  try{
    const newThought = await new Thought ({ message }).save()
    res.json(newThought)
  } catch (error) {
    res.status(400).json({ message: 'Invalid request',  error })
  }
})

// edpoint - get request for signup
app.post('/signup', async (req, res) => {
  const { username, password } = req.body
  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User ({
      username,
      password: bcrypt.hashSync(password, salt)
    }).save()
    res.json({
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error });
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
