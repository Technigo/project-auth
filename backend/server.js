import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User, Thought } from './utils/mongoose';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/project-mongo';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Authentication function
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: 'Please log in',
        success: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      response: err,
      success: false,
    });
  }
};

// Register end point
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: 'Password must be at least 8 characters long',
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt),
      }).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err,
    });
  }
});

// Login end point
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err,
    });
  }
});

// End point with content available after authentication
app.get('/thoughts', authenticateUser);
app.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find({});
  res.status(200).json({
    success: true,
    response: thoughts,
  });
});

// End point for post requests only available after authentication
app.post('/thoughts', authenticateUser);
app.post('/thoughts', async (req, res) => {
  const { message } = req.body;
  try {
    const newThought = await new Thought({ message }).save();
    res.status(201).json({
      success: true,
      response: newThought,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err,
    });
  }
});

/////
// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello Technigo!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
