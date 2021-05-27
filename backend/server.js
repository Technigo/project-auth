import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  username: {
    type: String, 
    required: true,
    unique: true, 
    maxlength: 15,
    minlength: 5
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

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

const authenticateUser = async (req, res, next) => {
  try
  {
     const user = await User.findOne({ accessToken: req.header('Authorization')})
     if (user){
       req.user = user;
       next()
     } else {
      res.status(401).json({ success: false, loggedOut: true })
     }
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid request", err})
  }
 }

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/secret', authenticateUser)
app.get('/secret', async (req, res) => {
  res.json({ success: true, message: 'This is a secret' })
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try{
    const salt = bcrypt.genSaltSync()
    const user = await new User({
      username,
      password: bcrypt.hashSync(password, salt)
    }).save()
    res.json({ 
      userID: user._id,
      username: user.username,
      accessToken: user.accessToken,
      success: true
    })
  } catch(err) {
    res.status(400).json({ success: false, message: "Invalid request", err})
  }
})

app.post('/signin', async (req, res) => {
  const { username, password } = req.body

  try{ 
    const user = await User.findOne({ username })
    
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
      userID: user._id,
      username: user.username,
      accessToken: user.accessToken,
      success: true
      })
    } else {
      res.status(404).json({ success: false, message: 'Incorrect username or password' })
      }
    } catch (err) {
      res.status(400).json({ success: false, message: "Invalid request", err})
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
