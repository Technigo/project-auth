import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const Thought = mongoose.model('Thought', {
  message: String
})

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/thoughts', async (_, res) => {
  const thoughts = await Thought.find()
  res.json(thoughts)
})

app.post('/thoughts', async (req, res) => {
  const { message } = req.body

  try{
    const newThought = await new Thought ({ message }).save()
    res.json(newThought)
  } catch (error) {
    res.status(400).json({ message: 'Invalid request',  error })
  }
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {

  } catch (error) {
    
  }
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
