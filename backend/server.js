import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// const validatePassword = (password) => {
//   const re = /^(?=.*?[A-Z])$/
//   return re.test(password)
// }

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        let re =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        const result = re.test(value)
        console.log(result)
        // if (result === false) {
        //   throw 'Password not valid'
        // }
      },
      message: 'Please fill in a valid password',
    },
    // validate: [validatePassword, 'Please fill a valid password'],
    // match: [
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    //   'Please fill a valid password',
    // ],
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
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res
        .status(401)
        .json({ response: 'User not found, please login', success: false })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/thoughts', authenticateUser)
app.get('/thoughts', (req, res) => {
  res.send('Here are your thoughts')
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    if (password.length < 5) {
      throw 'Password mush be at least 5 characters long'
    }
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save()
    console.log(password)

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

app.post('/signin', async (req, res) => {
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
      res.status(404).json({
        response: 'Username and/or password is incorrect',
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
