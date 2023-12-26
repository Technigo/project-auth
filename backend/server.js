import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import crypto from "crypto"
import bcrypt from "bcrypt-nodejs"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })
mongoose.Promise = Promise;

// create a user model using mongoose
// with properties for your registered user
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    // i would like to remove this unique true for email
    // bcs i hated this when i use website.
    // i wanted to create multiple id but was hard to have many email for it
    // but since i need to learn the structure first, ill leave this here haha
    unique: true
  },
  password: {
    type: String,
    required: true
  }, 
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start ////////
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// to store a users access token here
// so, we store using here, but how we see it back?
app.post('/users', async (req, res) => {
  // this is not working. why??
  console.log('Incoming Data:', req.body)
  try {
    const {name, email, password} = req.body
    console.log('Received Data:', { name, email, password })
    const user = new User({name, email, password: bcrypt.hashSync(password)})

    // check before save
    console.log('user data before saving:', user)

    await user.save()

    // check after save to make sure the line is being reached or not
    console.log('user data after saving:', user)

    res.status(201).json({id: user._id, accessToken: user.accessToken})
    console.log('User saved successfully', user)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(400).json({message: 'could not create user', errors: error.message})
    // get err
    // open diegos codealong
  }
})

app.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (!user) {
      return res.status(401).json({ message: 'invalid name or password' })
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'invalid name or password' })
    }
    res.status(200).json({ accessToken: user.accessToken })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ message: 'internal server error' })
  }
})

app.get('/user', async (req, res) => {
  try {
    // get access token from request header
    const accessToken = req.headers.authorization.split(' ')[1]
    console.log('Received Access Token:', accessToken)
    // find user in the database with access token
    const user = await User.findOne({ accessToken })
    console.log('User:', user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // return user information
    res.status(200).json({ createdAt: user.createdAt })
  } catch (error) {
    console.error('error fetching user:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


/// need data validation because regardless of what i input, it creates new user
// then there should be user list that has plenty of user. where is it?