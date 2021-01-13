import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
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
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ loggedOut: true })
  }
}

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

//Sign up 
app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body
    const SALT = bcrypt.genSaltSync(10);
    const user = new User({ name, password: bcrypt.hashSync(password, SALT) })
    user.save()
    res.status(201).json({ id: user._id, accessToken: user.accessToken })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Could not create user', errors: err.errors })
  }
})

//Login
app.post('/sessions', async (req, res) => {
  try {
    const {name, password} = req.body
    const user = await User.findOne({name})
    if(user && bcrypt.compareSync(password, user.password)){
      res.status(200).json({userId:user._id, accessToken: user.accessToken})
    } else {
      throw 'User not found'
    }
  } catch(err) {
    res.status(404).json({error:'User not found'})
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
