import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
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

//One-way encryption
// const user = new User({ name: "Niklas", password: bcrypt.hashSync("foobar") })
// user.save()

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ loggedOut: true })
  }
}

app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Tiago was here!')
})
// Registration post
app.post('/users', async (req, res) => {
  // try to register the user
  try {
    const { name, email, password } = req.body
    // it is very important to encrypt the passwords and store them encrypted in our db!
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    user.save()
    res.status(201).json({ id: user._id, accessToken: user.accessToken })
    // if the user is not registered, then we catch the error
  } catch (err) {
    res.status(400).json({ message: 'Couldn´t create user', errors: err.errors })
  }
})
//authenticated users
app.post('/tweets', authenticateUser)
app.post('/tweets', async (req, res) => {
  //This will only happen if the next() function is called from the middleware!
  // now we can access the req.user object from the middleware
})

// authentication access point (login/sign in)
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ name: req.body.name })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    //Successful
    res.json({ userId: user._id, accessToken: user.accessToken })
  } else {
    //Failure:
    // a) user does not exist
    // b) the encrypted password does not match
    res.json({ notFound: true })
  }
})

//Autorization for the super secret  message, only available for authenticated users
app.get('/secrets', authenticateUser)
app.get('/secrets', (req, res) => {
  res.json({ secret: 'This is a super secret message!' })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
// console.log(crypto.randomBytes(128).toString('hex'))

console.log(bcrypt.hashSync("foobar"))
console.log("string reached")