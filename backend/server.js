import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'
import listEndpoints from 'express-list-endpoints'
import dotenv from 'dotenv';

import travelData from './data/travel_nature.json'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const inspoSchema = new mongoose.Schema({
  id: String,
  urls: String,
})

const Inspo = mongoose.model('Inspo', inspoSchema)

if (process.env.RESET_DB) {
  const seedDB = async () => {
    await Inspo.deleteMany()

    travelData.forEach(async (item) => {
      const newInspo = new Inspo({
        id: item.id,
        urls: item.urls.small
      })
      await newInspo.save()
    })
  }

  seedDB()
}

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
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

const port = process.env.PORT || 8080
const app = express()

// Middlewares
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({ loggedOut: true, message: 'Please try logging in again' })
    }
  } catch (error) {
    res.status(403).json({ message: 'Access token is missing or wrong', error })
  }
}

app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/travelinspo', authenticateUser)
app.get('/travelinspo', async (req, res) => {
  const travelInspoToSend = await Inspo.find()   
  res.json(travelInspoToSend)


  // const secretMessage = 'This is a super secret message'
  
  // res.status(201).json({ secretMessage })
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()

    const newUser = await new User({ 
      username, 
      password: bcrypt.hashSync(password, salt) 
    }).save()
    
    res.status(201).json({ 
      success: true,
      userID: newUser._id, 
      username: newUser.username, 
      accessToken: newUser.accessToken 
    })
  } catch (error) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'User already exists', fields: err.keyValue })
    }
    res.status(400).json({ success: false, message: 'Could not create user', error })
  }
})

app.post('/signin', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })    

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ 
        success: true,
        userID: user._id,
        username: user.username, 
        accessToken: user.accessToken 
      })
    } else {
      res.status(404).json({ success: false, message: 'Could not find user' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
