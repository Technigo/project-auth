import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

//connect to database:
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

//user model with validation rules:
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 4
  },
  email: {
    email: mongoose.SchemaTypes.Email,
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  accessToken: {
    type: String,
    //default accesstoken created with the Crypto library
    default: () => crypto.randomBytes(128).toString('hex')
  }
})
//Middleware-function
//The param next will let express know what to do when authorization has taken place
const authenticateUser = async (req, res, next) => {
  //Here the user is identified via the accessToken in the header's authorization-field.(test in postman, by adding the header field authorization)
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(403).json({ message: "You need to login to access this page" })
  }
}

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//Registration endpoint where name, email and password can be assigned to a User in the database 
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body
    //TO NOT STORE PLAIN TEXT PASSWORDS
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    const saved = await
      // const saved = await user.save() res.status(201).json(saved)
      user.save()
    res.status(201).json({ id: user._id, accessToken: user.accessToken, message: "✨Created user ✨" })
  } catch (err) {
    res.status(400).json({ message: 'Could not create User', errors: err.errors })
  }
})

//Secret endpoint
//Applies the middleware-function above that checks authentication
app.get('/secrets', authenticateUser)
app.get('/secrets', (req, res) => {
  res.json({ message: '"And above all, watch with glittering eyes the whole world around you because the greatest secrets are always hidden in the most unlikely places. Those who don´t believe in magic will never find it."' })
})

//Logging in endpoint
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  //cleartext password from request compared to hashed password in database
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken })
  }
  else {
    res.json({ notFound: true, message: 'The user was not found or entered password is wrong' })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})