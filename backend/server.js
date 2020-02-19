import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlenght: 500
  },
  password: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})


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
  res.send('Hello world')
})

//create user
app.post('/users', (req, res) => {
  try {
    const {name, password} = req.body
    const user = new User({name, password: bcrypt.hashSync(password)})
    const saved = await user.save()
    res.status(200).json(saved)
  } catch (err) {
    res.status(400).json({message: 'could not save user', errors: err.errors})
  }
})

//find / login
app.post('/sessions', (req, res) => {
  try {
    const {name, password} = req.body
    const user = await User.findOne({ name })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({useId: user._id, accesToken: user.accesToken})
    }else {
      res.json({notFound: true})
    }
  } catch (err) {
    res.status(400).json({message: 'could not save user', errors: err.errors})
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

