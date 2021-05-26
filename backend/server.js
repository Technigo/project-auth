import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const Thought = mongoose.model('Thought', {
  message: String
})

// at least two properties 
const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
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
});

// access token always sent when you send your request frmo front end 
// if user have the access token then next()
//authenicate middlewear, specific on some end point or always 
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error });
  }
}

// Defines the port the app will run on. Defaults to 8080, but can be 
const port = process.env.PORT || 8080
const app = express()


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
//GET Requests
app.get('/', (req, res) => {
  res.send('Hello world')
})

//GET Requests to get all messages in Thought model:
// specify authenticateUser for this end point, do we have a user with this token -> then move on to next()
app.get('/thoughts', authenticateUser);
app.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find();
  res.json({ success: true, thoughts});
});

app.post('/thoughts', authenticateUser);
app.post('/thoughts', async (req, res) => {
  const { message } = req.body;

  try {
    const newThought = await new Thought({ message }).save();
    res.json({ success: true, newThought});
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error });
  }
});

// username and password required en point 
// hash password, never need to reveal the password when login in
// there is one matching hashed password in the database when login in 
// Salt: making the hash password random, makes it difficult to hack.
// hashed randomized password 
// or '/users' or '/register'
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt)
    }).save();

    res.json({
      success: true,
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error });
  }
});


// or '/session' or '/login'
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true, 
        userID: user._id,
        username: user.username,
        accessToken: user.accessToken
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error });
  }
});


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
