import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

//We are using schema and a hook called pre to enable minlength validation on password

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true
  }
})

//We want to save the password after the validation and after hashing it
//Only proceed if the password is modified
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

//SALT makes rainbow table attacks much harder
//Everytime the users endpoint is called,
//we create a salt & use that salt in the hash function

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);

// Continue with the save
  next()
})

//This is a middleware to prevent unauthenticated users, i.e users
//without the correct accessToken from entering the autheticated endpoint secrets

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({accessToken: req.header('Authorization')})
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({loggedOut: true})
  }
}

const User = mongoose.model('User', userSchema);

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Welcome to Auth API!')
})

//Endpoint for when you sign up
app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await new User({
      name,  
      password,
      }).save()
    res.status(201).json({id: user._id, accessToken: user.accessToken})
  } catch (err) {
    res.status(400).json({message: 'Could not create user', errors: err.errors})
  }
})

//This will only be shown if you are logged in (and have an accessToken)
app.get('/secrets', authenticateUser) 
app.get('/secrets', (req, res) => {
  res.json({secret: 'Pssst...2021 is gonna be an awesome year!'})
})

//Endpoint for logging in
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({name: req.body.name})
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({userId: user._id, accessToken: user.accessToken})
  } else {
    res.status(401).json({notFound: true})
  }
})
 
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})



















