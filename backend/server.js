import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
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
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true, 
  }
})

userSchema.pre('save', async function (next) {
  const user = this
  if(!user.isModified('password')) {
    return next()
  }

  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(user.password, salt)
  next()
})

const User = mongoose.model('User', userSchema)

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization')
    const user = await User.findOne({ accessToken })
    req.user = user
  } catch (err) {
    const errorMessage = 'please try again'
    res.status(401).json({error: errorMessage})
  }
  next()
}

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/users', async (req, res) => {
  try {
    const {name, email, password} = req.body
    const user = new User({name, email, password,})
    user.save()
    res.status(201).json({id: user._id, accessToken: user.accessToken})
  } catch(err) {
    res.status(400).json({message:'Could not create user', errors: err.errors})
  }
})

app.get('/secrets', authenticateUser);
app.get('/secrets', async (req, res) => {
  const secretMessage = `This is a super secret message for ${req.user.name}`;
  res.status(201).json({ secretMessage });
})

app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (user && bcrypt.compareSync(password, user.password)) {
      user.accessToken = crypto.randomBytes(128).toString('hex')
      
      const updatedUser = await user.save()
      res.status(200).json({
        userId: updatedUser._id,
        accessToken: updatedUser.accessToken,
      })
    } else {
      throw 'User not found'
    }
  } catch (err) {
    res.status(404).json({ error: 'User not found' })
  }
})

app.post('/users/logout', authenticateUser)
app.post('/users/logout', async (req, res) => {
  try {
    req.user.accessToken = null
    await req.user.save()
    res.status(200).json({ loggedOut: true })
  } catch (err) {
    res.status(400).json({ error: 'Could not logout' })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
