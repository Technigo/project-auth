import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';

const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1/auth-codeAlong2';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;
const { Schema } = mongoose;

// user schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
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

const User = mongoose.model('User', userSchema);

// thoughts schema
const thoughtSchema = new Schema({
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 140
  },
  hearts: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String
  }
});

const Thought = mongoose.model('Thought', thoughtSchema);

//authenticate user
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ success: false, message: 'Please log in' });
    }
  } catch (err) {
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello Technigo!');
});

// register user endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('this is username: ', username, 'this is pass:', password);
  try {
    const salt = bcrypt.genSaltSync();
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt)
    }).save();
    res.status(200).json({
      success: true,
      response: {
        username: newUser.username,
        id: newUser._id,
        accessToken: newUser.accessToken
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      response: {
        message: 'Could not create user',
        response: err
      }
    });
  }
});

// login user endpoint
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
          accessToken: user.accessToken
        }
      });
    } else {
      res.status(404).json({
        success: false,
        response: {
          message: 'User not found'
        }
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: {
        message: 'Could not create user',
        errors: err.errors
      }
    });
  }
});

// get all thoughts endpoint
app.get('/thoughts', authenticateUser);
app.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find();
  res.status(200).json({ success: true, response: thoughts });
});

app.post('/thoughts', authenticateUser);
app.post('/thoughts', async (req, res) => {
  const accessToken = req.header('Authorization');
  const { message } = req.body;
  const user = await User.findOne({ accessToken: accessToken });
  const newThought = await new Thought({ message: message, user: user }).save();
  res.status(200).json({ success: true, response: newThought });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
