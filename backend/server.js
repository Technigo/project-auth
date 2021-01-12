import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
    
  },
});

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
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
  res.send('Hello world');
});

// Endpoint for register new user
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync()
    const user = await new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt)
    }).save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err.errors });
  }
});

// Endpoint to see that user is logged in, if yes the user access the data.. 
app.get('/secrets', authenticateUser);
app.get('/secrets', (req, res) => {
  res.json({ secret: 'This is a secret message' });
});

// Endpoint for user to log in 
app.post('/sessions', async (req, res) => {
  // User to log in with email - to be checked in the database
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({ userId: user._id, accessToken: user.accessToken });
    } else {
      res.json({ notFound: true });
    }
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
});

app.get('/users/:id', async (req, res) => {
   res.status(501).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
