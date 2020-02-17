import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import User from '../lib/user/usermodel.js'

const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hej')
})

app.get('/user', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

module.exports = app