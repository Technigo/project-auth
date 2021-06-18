import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6

  },
  accesToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true
  },
})

userSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }
  
  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(user.password, salt)

  next()
})

const User = mongoose.model('user', userSchema)

const note = ('Note',{
  description: {
    type: String,
    required: true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({accesToken: req.header('Authorization')})
  if(user) {
    req.user = user 
    next()
  } else {
    res.status(401).json({loggedOut: true})
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

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello world')
})

//registration
app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await new User({ name, password }).save()
    res.status(201).json({ userId: user._id, accesToken: user.accesToken })
  } catch (err) {
    res.status(400).json({ message: 'Could not create the user', errors: err })
  }
}) 

//LOGIN
app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (user && bcrypt.compareSync(password, user.password)){
      res.status(200).json({ userId: user._id, accesToken: user.accesToken })
    } else {
      throw 'User is not found'
    }
  } catch (err) {
    res.status(400).json({ error: 'User is not found' })
  }
})

//AUTHENTICATED ENDPOINT
app.get('/secrets', authenticateUser)
app.get('/secrets', (req, res) => {
  res.json({ secret: 'Yes! You are Authenticated' })
})



// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
