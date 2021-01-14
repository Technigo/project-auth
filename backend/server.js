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
  email:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  accessToken:{
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

//Create a middleware
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
  }
};

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Sign-up endpoint
app.post('/users', async (req, res) => {
  try {
    const { email, password } = req.body;
    const SALT = bcrypt.genSaltSync(10);
    const user = new User({ email, password: bcrypt.hashSync(password, SALT) })
    const saved = await user.save()
    res.status(201).json({ id: saved._id, accessToken: saved.accessToken })
  } catch (err) {
    res.status(400).json({ message: 'Could not create user / User already exist', error:err.error });
  }
});

// Authenticated endpoint 
app.get('/secrets', authenticateUser);
app.get('/secrets', (req, res) => {
  res.json({ secret: 'Secret message' });
});

// Sign-in endpoint
app.post('/sessions', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(201).json({ userId: user._id, accessToken: user.accessToken })
    } else {
      res.status(400).json({ message: 'Wrong email or password', error:err.error })
    } 
  } catch (err) {
    res.status(400).json({ message: 'Wrong email or password', error:err.error })
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
