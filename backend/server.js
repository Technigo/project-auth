import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

// to create users 
const User= mongoose.model('Users',{
  username:{
    type: String,
    lowercase: true,
    unique: true
  }
})

//to create Thoughts 
const Thought = mongoose.model("Thoughts", {
  message: {
    type: String,
    required: true,
    minLength: 5,
    maxLength:140
  },
  hearts: {
    type: Number,
    default: 0,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  username:{
    type: String,
    ref: User,
    required: true
  },
  hashtag:{
    type: Array,
    default: []
  }
});

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
