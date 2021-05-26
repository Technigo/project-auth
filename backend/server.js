import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/flatEarthers"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: false })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
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

const Thought = mongoose.model('Thought', {
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: true
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
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/thoughts', authenticateUser)
app.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find()
  res.json(thoughts)
})

app.post('/thoughts', (req, res) => {
  const { username, message } = req.body
  
  try {
    const newThought = new Thought({
      username, 
      message
    })
    newThought.save()
    res.status(201).json({success: true, id: newThought._id, username: newThought.username, createdAt: newThought.createdAt, message: newThought.message})
  } catch (error) {
    res.status(400).json({success: false, message: 'Could not post thought', error})
  }
  
})

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body

  try {  
    const salt = bcrypt.genSaltSync()

    const user = new User({
      username, 
      email, 
      password: bcrypt.hashSync(password, salt)
    })
    user.save()
    res.status(201).json({success: true, id: user._id, username: user.username, email: user.email, accessToken: user.accessToken})
  } catch (error) {
    res.status(400).json({success: false, message: 'Could not create user', error})
  }
})

app.get('/secrets', authenticateUser)
app.get('/secrets', (req, res) => {
  res.json({secret: 'This is a super secret message.'})
})

app.post('/sessions', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({success: true, id: user._id, username: user.username, email: user.email,accessToken: user.accessToken})
    } else {
      res.json({success: false, notFound: true})
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error });
  }
})

app.patch('/sessions/:id', async (req, res) => {
  const { id } = req.params

  try {
    const updateUser = await User.findOneAndUpdate(id, { username: req.body.username })

    if (updateUser) {
      res.json({success: true}, updateUser)
    } else {
      res.status(404).json({ success: false, message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
