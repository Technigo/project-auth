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
    /*
    * TODO
    * name => Firstname + lastname
    * email => email + username
    * password => string (to be hashed)
    */

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

app.use((req, res) => {
  res.status(404).json({ error: `route ${req.originalUrl} doesn't exist` })
})

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})


module.exports = app