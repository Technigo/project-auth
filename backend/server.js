import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import listEndpoints from 'express-list-endpoints'
import dotenv from 'dotenv'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const Thought = mongoose.model('Thought', {
  message: String
})

// Here is Schema directly inside the Model. 
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (value) => {
        return /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
      },
      message: "Please enter a valid email address"
    }
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex') // when new user is created this will be called and create an accessToken 
  }
})

// Middleware function
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization') 

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({ success: false, loggedOut: true, message: 'Not authenticated' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
}

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/thoughts', authenticateUser)
app.get('/thoughts/', async (req, res) => {
  const thoughts = await Thought.find().sort()
  res.json({ success: true, thoughts})
})

app.post('/thoughts', authenticateUser)
app.post('/thoughts/', async (req, res) => {
  const { message } = req.body // destructure message from request body

  try {
    await new Thought({ message }).save()
    const thoughts = await Thought.find()
    res.json({ success: true, thoughts })
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  }
})

app.post('/signup', async (req, res) => {
 const { email, password } = req.body 
 try {
   const salt = bcrypt.genSaltSync() // initialize salt randomizer
   
   const newUser = await new User({
    email,
    password: bcrypt.hashSync(password, salt) // a hashed randomized password 2 arguments: password, salt
  }).save()
  console.log(newUser)
  res.json({
    success: true,
    userId: newUser._id,
    email: newUser.email,
    accessToken: newUser.accessToken
  })
 } catch (error) {
  res.status(400).json({ success: false, message: 'Invalid request', error }) // if user already signed up error === 11000 Duplicate value
 }
})
 
// standard to create a POST request to login ---> you are creating a 'session'
app.post('/signin', async (req, res) => {
   const { email, password } = req.body
    
   try {
    const user = await User.findOne({ email })

      if (user && bcrypt.compareSync(password, user.password)) {
        res.json({
          success: true,
          userId: user._id,
          email: user.email,
          accessToken: user.accessToken
        })
      } else {
        res.status(404).json({ success: false, message: 'Login failed'})
      }
   } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid request', error })
   }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
