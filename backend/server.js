import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI2"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5
   },
   accessToken: {
     type: String,
     default: () => crypto.randomBytes(128).toString('hex'),
     unique: true,
   },
})

//user registration validation
userSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  const salt = bcrypt.genSaltSync()
  console.log(`PRE- password before hash: ${user.password}`)
  user.password = bcrypt.hashSync(user.password, salt)
  console.log(`PRE- password after  hash: ${user.password}`)

  // Continue with the save
  next()
}
)

const User = mongoose.model('User', userSchema)

const Note = mongoose.model('Note', {
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({accessToken: req.header('Authorization')})
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

//registration endpoint
app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await new User({
      name,
      password
    }).save()
    res.status(201).json({ userId: user._id, accessToken: user.accessToken })
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err })
  }
}
)

//login endpoint
app.post('/sessions', async (req, res) => {
try {  
  const { name, password } = req.body
  const user = await User.findOne({ name })
  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json({ userId: user._id, accessToken: user.accessToken })
  } else {
    throw 'User not found'
  }
} catch (err) {
  res.status(404).json({ error: 'User not found' })
}
})

//authenticated endpoint
app.get('/secrets', authenticateUser)
app.get('/secrets', (req, res) => {
  res.json({secret: 'you are authenticated'})
}
)

//authenticated endpoint to post notes
app.post('/notes', authenticateUser)
app.post('/notes', async (req, res) => {
  try {
    const description = req.body.description
    const user = req.user
    const note = await new Note({ description, user }).save()
    res.json({description, user})
  } catch (err) {
    res.status(400).json({ error: 'could not create new note' })
  }
})

//retrieve notes for a specific user
app.get('/notes', authenticateUser)
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user })
    res.json(notes)
  } catch (err) {
    res.status(404).json({ error: 'User not found' })
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})