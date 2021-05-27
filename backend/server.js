import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false  })
mongoose.Promise = Promise

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
  feelings: {
    type: Array,
    default: []
  }
})

const User = mongoose.model('User', userSchema)
// const feelingSchema = mongoose.Schema({
//   description: {
//     type: String
//   },
//   numericValue: {
//     type: Number,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// })

// const Feeling = mongoose.model('Feeling', feelingSchema)

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')
  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
}

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/secrets', authenticateUser)
app.get('/secrets', (req, res) => {
  res.json({ message: 'Here is you VIP ticket' })
})

app.post('/users', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username,
      email,
      password: bcrypt.hashSync(password, salt)
    }).save()
    res.json({
      success: true,
      userId: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken,
      feelings: newUser.feelings
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Could not create user',
      error
    })
  }
})

app.post('/sessions', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userId: user._id,
        username: user.username,
        accessToken: user.accessToken,
        feelings: user.feelings
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ success: false,  message: 'Invalid request', error })
  }
})

app.post('/users/:id/feelings', authenticateUser)
app.post('/users/:id/feelings', async (req, res) => {
  const { id } = req.params
  const { feelings } = req.body
  
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: id
      }, 
      {
        $push:
          { 
            feelings: feelings
          } 
      }, 
      {
        new: true
      }
    )
    if (user){
      res.json({ 
        success: true,
        feelings: user.feelings 
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error){
    res.status(401).json({ message: 'Bad reques', error })
  }
})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
