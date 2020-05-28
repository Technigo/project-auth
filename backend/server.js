import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';

// Mongoose & Database setup:
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Mongoose model setup:

const User = mongoose.model('User', {
  name: {
    type: String, 
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
});

// middleware to authenticate user:
// use try/catch + status message??

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ accessToken: req.header("Authorization") });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ loggedOut: true, message: 'Please try logging in again' });
    }
  } catch (err) {
    res.status(403).json({ message: 'Access token is missing or wrong', errors: err })
  }
};

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Middleware for handling if "no connection to Mongodb":


// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world - snart är det helg!')
})


// add user endpoint - the registration endpoint:
// POST - http://localhost:8080/users

app.post('/users', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const user = new User({name, email, password: bcrypt.hashSync(password)});
    await user.save();
    res.status(201).json({ userId: user._id, accessToken: user.accessToken });
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err.errors });
  }
});

// supersecret endpoint - the protected endpoint
// restrict access - - using authenticateUser:
// GET - http://localhost:8080/secrets
app.get('/secrets', authenticateUser);
app.get('/secrets', async (req, res) => {
  const secretMessage = `This is a super secret message for ${req.user.name}`;
  // can do anything here, but we just put in a message

  // res.status(201).json({ name: req.user.name });
  res.status(201).json({ secretMessage });
});


// endpoint to login a User - and check email and password:
// POST - http://localhost:8080/sessions
// use try/catch + status message??
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken, name: user.name });
  } else {
    res.status(401).json({ notFound: true, error: 'Login failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
