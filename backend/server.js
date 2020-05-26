import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import { User } from './Models'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

const authenticateUser = async ( req, res, next ) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization')
    })
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({ authorized: false })
    }
  } catch (err) {
    res.status(403).json({ message: "Access token missing or incorrect", errors: err})
  }
}

app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = new User({name, password: bcrypt.hashSync(password)})
    const saved = await user.save()
    res.status(201).json({userId: saved._id, accessToken: saved.accessToken})
  } catch (err) {
    res.status(404).json({ message: "Could not create user", errors: err })
  }
})

app.post('/users/:id', authenticateUser)
app.post('/users/:id', async (req, res) => {
  res.status(201).json({ name: req.user.name, userId: req.user._id, authorized: true})
})

app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name: name })
    
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(202).json({userId: user._id, accessToken: user.accessToken})
    } else {
      res.status(404).json({ notFound: true })
    }
  } catch (err) {
    res.status(404).json({  notFound: true })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
