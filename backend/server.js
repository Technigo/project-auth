import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Libraries
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'
import listEndpoints from 'express-list-endpoints'

// Connected to database
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.Promise = Promise

// Defines port the app will run on
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app))
});

// User model with validation rules: name, email, password and default accessToken with crypto library
const User = mongoose.model('User', {
  name: {
      type: String,
      unique: true,
      required: true
  },
  email: {
      type: String,
      unique: true,
      required: true
  },
  password:{
      type: String,
      required: true
  },
  accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString('hex')
  }
})

// Middleware function which looks up the user based on the accessToken stored in the header, which we can test. Then calling next() which allows protected endpoint to continue execution
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })

  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({loggedOut: true})
  }
}

//---------------------------SIGN UP ENDPOINT---------------------------//
app.post('/signup', async (req, res) => {

  try {
    const { name, email, password } = req.body

    // Not storing the password in plain text
    const user = new User({ 
      name, 
      email, 
      password: bcrypt.hashSync(password)})
    user.save()
    res.status(201).json({
      id: user._id, 
      accessToken:user.accessToken})

  } catch (err) {
    res.status(400).json({message: 'Could not create user', errors: err.errors})
  }
})


//---------------------------USER LOGIN ENDPOINT---------------------------//
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json(
        {
          response: {
            id: user._id,
            name: user.name,
            email: user.email,
            accessToken: user.accessToken
          },
          success: true
        })
    } else {
      // User do not exist or encrypted password doesnt match
      res.status(404).json({ response: "Email or password doesn't match", success: false })
    }
  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

//---------------------------PROFILE PROTECTED ENDPOINT---------------------------//
app.get('/profile', authenticateUser, async (req, res) => {
  res.json({secret: 'This is a super secret message'})
})

//---------------------------SESSIONS ENDPOINT---------------------------//
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json({userId: user._id, accessToken: user.accessToken})
} else {
      res.json({notFound: true})
}
})

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
