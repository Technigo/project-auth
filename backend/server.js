import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('user', {
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


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ loggedOut: true })
  }
}

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
 })

 app.post('/users', async (req, res) => {
  try {
    const { name, email, password} = req.body;
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res 
    .status(400)
    .json({ message: 'could not create user', error: err.errors })
  }  
});

 //funkar
 app.get('/secrets', authenticateUser)
 app.get('/secrets', async (req, res) => {
   res.json({ secret: 'This is a secret message'})
 })
//login 

app.post('/sessions', async (req, res) => {
  try {
  const user = await User.findOne({ email: req.body.email }) //retrieve user
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    //success 
    res.json({ userId: user._id, accessToken: user.accessToken })
  } else {
    //faliure 
    //a.
    //b.
    res.json({ notFund: true })
  }
} catch (err) {
  res
  .status(400)
  .json({ message:'Could not create user', error: err.errors })
}
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
// console.log(crypto.randomBytes(2).toString('hex'))