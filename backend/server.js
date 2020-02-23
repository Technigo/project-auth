import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth-project"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
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


// - login, and finally an authenticated endpoint.
// - The authenticated endpoint should return a 403 with an error message if you try to access it without an `Authentication` access token, or with an invalid token.
// - DONE! Your frontend should have a registration form which POSTs to the API to create a new user
// - DONE! Your passwords in the database should be encrypted with bcrypt
// - Your API should validate the user input when creating a new user, and return error messages which could be shown by the frontend (displaying the errors in a nice way in the frontend is a stretch goal - its fine to just show 'Something went wrong' on the frontend if you run out of time)
// - Once a user is logged in, you will need to have one last endpoint which returns some content which only logged-in users should be able to access. 

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Authenticate user

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization')
    })
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({ loggedOut: true })
    }
  } catch (err) {
    res
      .status(403)
      .json({ messsage: 'Please try logging in again', errors: err.errors })
  }
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//Secure endpoint for signed in user... IS THIS THE SAME AS THE BELOW WHERE WE GET "Welcome"?
// app.get('/signedin', (req, res) => {
//   res.json({ secret: "signed in" })
// })


app.use('/users/:id', authenticateUser)
app.get('/users/:id', (req, res) => {
  try {
    // res.send('Welcome')
    res.status(201).json(req.user)
  } catch (err) {
    res.status(400).json({ message: 'Could not save user', errors: err.errors })
  }
})


// Create User -  SignUp

app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = new User({ name, password: bcrypt.hashSync(password) })
    const saved = await user.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err.errors })
  }
});


// LogIn User

app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ useId: user._id, accessToken: user.accessToken })
    } else {
      res.json({ notFound: true })
    }
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err.errors })
  }
});

// User - singIn

// app.post('/sessions', async (req, res) => {

// })

// Secure endpoint 

// app.get


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
