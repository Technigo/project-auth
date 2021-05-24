import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const Thought = mongoose.model('Thought', {
  message: String
})

// at least two properties 
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
    // function declaration method run one time when application start, one unique access token
    default: () => crypto.randombytes(128).toString('hex')
  }
})

// Defines the port the app will run on. Defaults to 8080, but can be 
const port = process.env.PORT || 8080
const app = express()


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
//GET Requests
app.get('/', (req, res) => {
  res.send('Hello world')
})

//GET Requests to get all messages in Thought model:
app.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find()
  res.json(thoughts)
})

// POST Requests to our Thought model, with a message. 
app.post('/thoughts', async (req, res) => {
  const { message } = req.body   

  try { 
    const newThought = await new Thought({ message }).save()
    res.json(newThought)
  } catch (error) {
      res.status(400).json({ message : "invalid request", error })
    }
})

// username and password required en point 
// hash password, never need to reveal the password when login in
// there is one matching hashed password in the database when login in 
// Salt: making the hash password random, makes it difficult to hack.
// hashed randomized password 
app.post('/signup', async (req,res) => {
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
    res.json(400).json({ message: 'invalid request', error })
  }
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
