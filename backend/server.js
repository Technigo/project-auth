import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: false, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    unique: false
  },
  age: {
    type: Number,
    unique: false
  },
  location: {
    type: String,
    unique: false
  },
  description: {
    type: String,
    unique: false
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
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/sessions/:id', authenticateUser)
app.get('/sessions/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    if (user) {
      res.status(201).json({ email: user.email, fullName: user.fullName, age: user.age, location: user.location, description: user.description })
    } else {
      res.status(404).json({ success: false, message: 'Could not find profile information' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  }
  
})

app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body

  try {
    const salt = bcrypt.genSaltSync()

    const newUser = await new User({ 
      username, 
      password: bcrypt.hashSync(password, salt),
      email 
    }).save()
    
    res.status(201).json({ 
      success: true,
      id: newUser._id, 
      username: newUser.username, 
      email: newUser.email,
      accessToken: newUser.accessToken, 
    })
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'User already exists', fields: error.keyValue })
    }
    res.status(400).json({ success: false, message: 'Could not create user', error })
  }
})

app.post('/sessions', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ 
        success: true, 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        accessToken: user.accessToken, 
        fullName: user.fullName, 
        age: user.age, 
        location: user.location, 
        description: user.description 
      })
    } else {
      res.status(404).json({ success: false, message: 'Could not find user' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})

app.patch('/sessions/:id', authenticateUser)
app.patch('/sessions/:id', async (req, res) => {
  const { id } = req.params

  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true })

    if (updateUser) {
      res.json({ success: true, updateUser })
    } else {
      res.status(404).json({ success: false, message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  }
})

// Start the server
app.listen(port, () => {
})
