import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI'
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
mongoose.Promise = Promise

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
})

const User = mongoose.model('User', UserSchema)

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization'),
    })
    if (user) {
      next()
    } else {
      res.status(401).json({
        message: 'Please, log in',
        response: 'Please, log in',
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'ERROR',
      response: error,
      success: false,
    })
  }
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/poems', authenticateUser)
app.get('/poems', (req, res) => {
  // res.status(200).json('Here are your poems')
  // try {
  res.status(200).json({
    response: {
      title: 'A Smile',
      author: 'Malak Meleka',
      poem: `When someone's having a bad day, 
      A smile could go a long way, 
      So make sure to put one on 
      And keep it until the day is gone.
      You don't know what this deed
      Could do for a friend in need.
      It might save them from the pain
      Of a sadness they cannot contain.
      Don't ask what a smile can do
      Because I'm sure it once helped you.`,
      source: 'https://www.familyfriendpoems.com/poem/a-smile-3',
    },
    success: true,
  })
  // } catch (error) {
  //   res.status(404).json({
  //     message: 'Poem not found',
  //     response: error,
  //     success: false,
  //   })
  // }
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save()

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Please provide username and password',
      response: error,
      success: false,
    })
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      })
    } else {
      if (username === '') {
        res.status(404).json({
          message: 'Login failed: fill in username',
          response: 'Login failed: fill in username',
          success: false,
        })
      } else if (password === '') {
        res.status(404).json({
          message: 'Login failed: fill in password',
          response: 'Login failed: fill in password',
          success: false,
        })
      } else {
        res.status(404).json({
          message: 'Login failed: wrong username or password',
          response: 'Login failed: wrong username or password',
          success: false,
        })
      }
    }
  } catch (error) {
    res.status(400).json({
      message: 'Invalid entry',
      response: error,
      success: false,
    })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
