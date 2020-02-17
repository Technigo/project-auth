import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import User from '../lib/user/usermodel.js'
import bcrypt from 'bcrypt-nodejs'

const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hej')
})

app.get('/user', async (req, res, next) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

app.post('/registration', async (req, res, next) => {
  try {
    const {
      name,
      email,
      password
    } = req.body

    const newUser = await new User({ name, email, password: bcrypt.hashSync(password) }).save()
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

app.post('/login', async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body
    const user = await User.findOne({ email: email })
    if(user && bcrypt.compareSync(password, user.password)){
      res.json(user)
    } else {
      throw new Error(`user not found or password doesn't match`)
    }
  } catch (err) {
    next(err)

  }
})

app.use((req, res) => {
  res.status(404).json({ error: `route ${req.originalUrl} doesn't exist` })
})

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})


module.exports = app