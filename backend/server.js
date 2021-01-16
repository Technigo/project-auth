import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { isEmail } from 'validator';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

// Error variables
const SERVICE_UNAVAILABLE = 'Service unavailable';
const LOGIN_FAILED = 'Please try logging in again';
const POST_FAILED = 'Could not create user';
const USER_NOT_FOUND = 'User not found';
const LOGOUT_FAILED = 'Could not logout';
const ACCESS_DENIED = 'Access denied';

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'Name is too short'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [isEmail, 'Invalid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Password must be at least 5 characters'],
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
});

// Middleware to hash password before new user is saved
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

// Model
const User = mongoose.model('User', userSchema);

// Defines the port
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Error message if server is down
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).send({ error: SERVICE_UNAVAILABLE });
  }
});

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization'),
    });

    if (!user) {
      throw USER_NOT_FOUND;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: LOGIN_FAILED, errors: err.errors });
  }
};

// GET - list of all endpoints
const listEndpoints = require('express-list-endpoints');
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

// POST - registration endpoint (creates user)
app.post('/users', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await new User({
      email,
      name,
      password,
    }).save();
    res.status(200).json({
      userId: user._id,
      accessToken: user.accessToken,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(400).json({
      message: POST_FAILED,
      errors: { message: err.message, error: err },
    });
  }
});

// POST - login user
app.post('/sessions', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      user.accessToken = crypto.randomBytes(128).toString('hex');

      const updatedUser = await user.save();
      res.status(200).json({
        userId: updatedUser._id,
        accessToken: updatedUser.accessToken,
        name: updatedUser.name,
      });
    } else {
      throw USER_NOT_FOUND;
    }
  } catch (err) {
    res.status(404).json({ message: USER_NOT_FOUND, errors: err.errors });
  }
});

//POST - logout user
app.post('/users/logout', authenticateUser);
app.post('/users/logout', async (req, res) => {
  try {
    req.user.accessToken = null;
    await req.user.save();
    res.status(200).json({ loggedOut: true });
  } catch (err) {
    res.status(400).json({ error: LOGOUT_FAILED });
  }
});

// GET - secure endpoint, protected by authenticateUser.
//Looks up the user based on the access token stored in the header
app.get('/users/:id/secret', authenticateUser);
app.get('/users/:id/secret', async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId != req.user._id) {
      throw ACCESS_DENIED;
    }
    const secretMessage = `This is a secret message for ${req.user.name}`;
    res.status(200).json(secretMessage);
  } catch (err) {
    res.status(403).json({ error: ACCESS_DENIED });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
