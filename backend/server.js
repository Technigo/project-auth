import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import listEndpoints from 'express-list-endpoints'

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
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
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

// Middleware function used with cors and express.json(app)
// Logic of the guard inside of the club / the bartender when you wanna get a drink
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization') 

  try {
    const user = await User.findOne({ accessToken }) // lookup by accessToken
    if (user) {
      req.user = user // keep or throw? 
      next() // ok go ahead/proceed! 
    } else {
      res.status(401).json({ loggedOut: true, message: 'Not authenticated' }) // not authenticated
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  }
}

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json()) // app here?
//app.use(authenticateuser) // use it ALL the time / everywhere add it here. BUT then it would be impossible to actually sign-up

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/thoughts', authenticateUser)
app.get('/thoughts/', async (req, res) => {
  const thoughts = await Thought.find()
  res.json(thoughts)
})

app.post('/thoughts', authenticateUser)
app.post('/thoughts/', async (req, res) => {
  const { message } = req.body // destructure message from request body

  try {
    const newThought = await new Thought({ message }).save() // Create a new thought-message
    res.json(newThought)
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error }) // If key and value are the same no need to specify both of them. ES6 feature. 
  }
})

// or call the endpoint:  /user or:  /register
app.post('/signup', async (req, res) => {
 const { email, password } = req.body  // --> sent from frontend

 try {
   const salt = bcrypt.genSaltSync() // initialize salt randomizer
   
   const newUser = await new User({
    email,
    password: bcrypt.hashSync(password, salt) // a hashed randomized password 2 arguments: password, salt
  }).save()

  res.json({
    userId: newUser._id,
    email: newUser.email,
    accessToken: newUser.accessToken
  })
 } catch (error) {
  res.status(400).json({ message: 'Invalid request', error })
 }
})

// standard to create a POST request to login ---> you are creating a 'session'
// login
app.post('/signin', async (req, res) => {
   const { email, password } = req.body
    
   try {
    const user = await User.findOne({ email }) // lookup by email

      if (user && bcrypt.compareSync(password, user.password)) {
        res.json({
          userId: user._id,
          email: user.email,
          accessToken: user.accessToken
        })
      } else {
        res.status(404).json({ message: 'User not found'})
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
