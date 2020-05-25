import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;
mongoose.set('useCreateIndex', true);

const User = mongoose.model('User', {
  name: {
    type: String,
    uniqe: true,
  },
  email: {
    type: String,
    uniqe: true,
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

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization'),
    });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).json({ message: 'you need to log in to see this page' });
    }
  } catch (err) {
    res.status(400).json({ message: 'access denied', errors: err.errors });
  }
};

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello Auth!');
});

// SIGN UP
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    const saved = await user.save();
    res.status(201).json({ userId: saved._id, accessToken: saved.accessToken });
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err });
  }
});

// SECURE ENDPOINT, CHECK IF USER IS AUTHORIZED
app.get('/users/:id', authenticateUser);
app.get('/users/:id', (req, res) => {
  res.send('This is a super secret message.');
});

// LOG IN
app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ userId: user._id, accessToken: user.accessToken });
    } else {
      res.json({ notFound: true });
    }
  } catch (err) {
    res.status(400).json({ message: 'Could not log in', errors: err.errors });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
