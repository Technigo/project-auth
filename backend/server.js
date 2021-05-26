import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import drinkData from './data/drink-recipes.json'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true, 
    unique: true 
  }, 
  password: {
    type: String,
    required: true,
    minlength: 8, // add error message
  }, 
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
      },
      message: "Please enter a valid email address"
    }
  }, 
  accessToken: {
    type: String, 
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const DrinkRecipe = mongoose.model('DrinkRecipe', {
  title: String,
  id: Number,
  description: String,
  alcoholic: Boolean,
})

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      // req.user = user
      next()
    } else {
      res.status(401).json({ message: 'Not authenticated' })
    }
  } catch (error) {
    res.status(400).json({ message: 'invalid request', error})
  }
}

if (process.env.RESET_DATABASE) {
  const seedDB = async () => {
    console.log("SEEDING!")
    await DrinkRecipe.deleteMany()
    
    drinkData.forEach(async (item) => {
      const drinkRecipe = new DrinkRecipe(item)
      await drinkRecipe.save()
    })
  }
  seedDB()
}

const port = process.env.PORT || 8080
const app = express()
//testing!! Elaine was here, writing by your test!
// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/happyhour', authenticateUser)
app.get('/happyhour', async (req, res) => {
  const drinkRecipes = await DrinkRecipe.find()
  res.json(drinkRecipes)
})

app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username,
      email,
      password: bcrypt.hashSync(password, salt)
    }).save()
    res.json({
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
      accessToken:newUser.accessToken
    })
  } catch(error) {
    res.status(400).json({ message: 'invalid request', error})
  }
})

app.post('/signin', async (req, res) => {
  const { username, password, email } = req.body
  // checks if user logs in with username or email 
  try {
    if (username) {
      var user = await User.findOne({ username })
    } else {
      var user = await User.findOne({ email })
    } 

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        userId: user._id,
        username: user.username,
        email: user.email,
        accessToken:user.accessToken
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'invalid request', error})
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
