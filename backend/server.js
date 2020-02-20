import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }

})

//One-way encryption
// const user = new User({ name: "Niklas", password: bcrypt.hashSync("foobar") })
// user.save()

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
// access point for the session

app.post('/session', async (req, res) => {
  const user = await User.findOne({ name: req.body.name })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    //Successful
    res.json({ userId: user._id, accessToken: user.accessToken })
  } else {
    //Failure:
    // a) user does not exist
    // b) the encrypted password does not match
    res.json({ notFound: true })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
// console.log(crypto.randomBytes(128).toString('hex'))

console.log(bcrypt.hashSync("foobar"))
console.log("string reached")