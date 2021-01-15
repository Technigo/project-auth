import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
});

// Pre-save - to check the password validation before hashing the password
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = bcrypt.genSaltSync();
  // Hash the password to hex 
  user.password = bcrypt.hashSync(user.password, salt);

  // Continue with the save
  next();
});

const User = mongoose.model('User', userSchema);

// To being able to do authentication check
const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ accessToken: req.header('Authorization') });
    req.user = user;
    if (!user) {
      throw 'User not found';
    }
    next();
  } catch (err) {
    const errorMessage = 'Please try to log in again.';
    res.status(401).json({ error: errorMessage });
  }
};

const port = process.env.PORT || 8080;
const app = express();

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

////////// Our routes start here //////////
// To list all available endpoints on the starting page
const listEndpoints = require('express-list-endpoints');
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

// Endpoint for register new user: SIGN UP
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await new User({
      name,
      email,
      password
    }).save();
    res.status(201).json({ userId: user._id, accessToken: user.accessToken });
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err.errors });
  }
});

// Endpoint to see that user is logged in, 
// if yes the user access the secret message.. 
app.get('/secrets', authenticateUser);
app.get('/secrets', (req, res) => {
  const secretMessage = `Hi ${req.user.name}! This is a secret message!`
  res.status(200).json({ secretMessage });
});

// Endpoint for user to log in 
app.post('/sessions', async (req, res) => {
  // User to log in with email - to be checked in the database
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({ userId: user._id, accessToken: user.accessToken });
    } else {
      res.status(400).json({ notFound: true });
    }
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
});

// Endpoint for Log out
app.post('/users/logout', authenticateUser);
app.post('/users/logout', async (req, res) => {
  try {
    req.user.userId = null;
    await req.user.save();
    res.status(200).json({ loggedOut: true });
  } catch (err) {
    res.status(400).json({ error: 'Could not logout' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});