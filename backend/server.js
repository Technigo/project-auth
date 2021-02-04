import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import listEndpoints from 'express-list-endpoints'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
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

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization')
    const user = await User.findOne({ accessToken })

    if (!user) {
      throw 'Login error '
    }
    req.user = user
    next()
  } catch (err) {
    const errorMessage = 'Try again'  
    res.status(401).json({ errorMessage: err.errors })
  }
}

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.post('/users', async(req, res) => {
  try {
    const { name, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const user = await new User({
      name,
      password: bcrypt.hashSync(password, salt)
    }).save()
    res.status(201).json({ 
      id: user._id, 
      accessToken: user.accessToken 
    })
  } catch (err) {
    res.status(400).json({ 
      message: "Could not create user", 
      errors: err.errors 
    })
  }
})

app.get('/secret', authenticateUser)
app.get('/secret', (req, res) => {
  const secretMessage = `This is a secret message for ${req.user.name}`
  res.status(201).json({ secretMessage })
})

app.post('/sessions', async(req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name })
    if (user && bcrypt.compareSync(req.body.password , user.password)) {
      res.status(201).json({
        userId: user._id, 
        accessToken: user.accessToken 
      })
    } else {
      res.status(404).json({ 
        notFound: true, 
        message: "Check if username and/or password is correct" 
      })
    }
  } catch (err) {
    res.status(404).json({ 
      notFound: true, 
      message: "Check if username and/or password is correct" 
    })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
