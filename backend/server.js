import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

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
  }
})
// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
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

// Endpoint to register user
app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await new User({
      name,
      password
    }).save();
    res.status(200).json({ userId: user._id });

  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err });
  }
})
// Endpoint login
app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    res.status(200).json({userId: user._id})
  } catch (err) {
    res.status(404).json({ error: err });
  }
})
// Authenticated endpoint

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
