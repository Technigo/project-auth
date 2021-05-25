import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import crypto from 'crypto'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
mongoose.Promise = Promise

//A model for new Thought
const Thought = mongoose.model('Thought', {
  message: String
})

const User = mongoose.model('User', {
  username: {
    type:String,
    required:true,
    unique:true       
  },
  password: {
    type:String,
    required:true
  },
  accessToken: {
    type:String,
    default:() => crypto.randomBytes(128).toString('hex')
  }
})



const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})
//An endpoint to get all thoughts
app.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find()
  res.json(thoughts)
})

app.post('/thoughts', async (req, res) => {
  const { message } = req.body

  try {
    const newThought = await new Thought ({ message }).save()
    res.json(newThought)
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
