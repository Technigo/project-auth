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
  name: {
    type: String,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  // accessToken: {
  //   type: String,
  //   default: () => crypto.randomBytes(128).toString('hex'),
  //   unique: true,
  // },
});

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

//registration endpoint
app.post('/users', async (req, res) => {
  try {
    // const {name, password} = req.body
    const {name} = req.body
    
    // const user = new User({name, password: bcrypt.hashSync(password)})
    const user = await new User({name}).save()
    rres.status(200).json(user);
  } catch (err) {
    res.status(400).json({message: 'Could not create user', errors: err.errors})
  }

}

)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
