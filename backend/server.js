import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const User = mongoose.model('User', {
  name: {
    type : String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: true
  },
  accestoken: {
   type: String,
   default: () => crypto.randomBytes(128).toString('hex') 
  }
})

const authenticateUser = async (req, res) => {
  const user = await User.findOne({accessToken: req.header('Authorization')})
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({loggedOut: true})
  }
}



// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/users', async (req, res) => {
  try {
    const {name, email, password} = req.body
    const user = new User ({name, email, password: bcrypt.hashSync(password)})
    user.save()
    res.status(201).json({id: user._id, accessToken: user.accessToken})
  } catch (err) {
    res.status(400).json({message:'Could not create userinfo', errors: err.errors})
  }
})
app.get('/secrets', authenticateUser)
app.get('/secrets', (req, res) => {
  res.json({secret: 'This is a secret message'})
})

app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ useId: user._id, accessToken: user.accessToken })
    } else {
      res.json({ notFound: true })
    }
  } catch (err) {
    res.status(400).json({ message: 'Unable to find user', errors: err.errors })
  }
  })
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
