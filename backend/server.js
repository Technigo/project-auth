import express from 'express'
import cors from 'cors'

// Libraries
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'
import listEndpoints from 'express-list-endpoints'

// Connected to database
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth"
mongoose.connect(mongoUrl, {
   useNewUrlParser: true, 
   useUnifiedTopology: true,
   useCreateIndex: true })

mongoose.Promise = Promise

// User model with validation rules: username, password and default accessToken with crypto library
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
})

const User = mongoose.model('User', UserSchema)

// Defines port the app will run on
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())


// If we can't reach the database, status 503
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: 'Service unavailable' })
  }
})

// Middleware function which looks up the user based on the accessToken stored in the header, which we can test. Then calling next() which allows protected endpoint to continue execution
const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization'),
    })
    if (user) {
      next()
    } else {
      res.status(401).json({
        message: 'Please, log in',
        response: 'Please, log in',
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'Error, could not authenticate user',
      response: error,
      success: false,
    })
  }
}

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app))
});

//---------------------------PROFILE PROTECTED ENDPOINT---------------------------//
app.get('/quote', authenticateUser)
app.get('/quote', (req, res) => {
  res.status(200).json({
    response: {
      title: 'Continue',
      author: 'Carrie Fisher',
      quote: `Stay afraid, but do it anyway. What's important is the action. You don't have to wait to be confident. Just do it and eventually the confidence will follow`,
      source: 'https://www.snhu.edu/about-us/newsroom/education/personal-growth-quotes',
    },
    success: true,
  })
})


//---------------------------SIGN UP ENDPOINT---------------------------//
app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    // salt -> randomizer
    const salt = bcrypt.genSaltSync()

    // // stop the executing of try block with throw
    if (password === '') {
      throw 'Please provide password'
    }

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save()

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
      },
      success: true,
    })
  } catch (error) {
    if (username === '') {
      res.status(400).json({
        message: 'Validation failed: provide your username',
        response: error,
        success: false,
      })
    } else if (error.code === 11000 && error.keyPattern.username) {
      res.status(400).json({
        message: 'Validation failed: username already exist',
        response: error,
        success: false,
      })
    } else if (password === '') {
      res.status(400).json({
        message: 'Validation failed: provide password',
        response: error,
        success: false,
      })
    } else {
      res.status(400).json({
        message: 'Validation failed: please provide username and password',
        response: error,
        success: false,
      })
    }
  }
})


//---------------------------USER LOGIN ENDPOINT---------------------------//
app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      })
    } else {
      if (username === '') {
        res.status(404).json({
          message: 'Login failed: fill in username',
          response: 'Login failed: fill in username',
          success: false,
        })
      } else if (password === '') {
        res.status(404).json({
          message: 'Login failed: fill in password',
          response: 'Login failed: fill in password',
          success: false,
        })
      } else {
        res.status(404).json({
          message: 'Login failed: wrong username or password',
          response: 'Login failed: wrong username or password',
          success: false,
        })
      }
    }
  } catch (error) {
    res.status(400).json({
      message: 'Invalid entry',
      response: error,
      success: false,
    })
  }
})



// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})