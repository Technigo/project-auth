import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import endpoints from 'express-list-endpoints';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/auth';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = Promise;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Name is too short'],
    maxlength: [40, 'Name is too long']
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Password must be at least 5 characters']
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
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

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization');
    const user = await User.findOne({ accessToken });
    if (!user) {
      throw 'User not found';
    }
    req.user = user;
    next();
  } catch (err) {
    const errorMessage = 'Please try logging in again';
    res.status(401).json({ error: errorMessage });
  }
};

// Model
const User = mongoose.model('User', userSchema);

// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// GET - list of all endpoints
app.get('/', (req, res) => {
  if (!res) {
    res
      .status(404)
      .send({ error: 'Oops! Something goes wrong. Try again later!' });
  }
  res.send(endpoints(app));
});

// Error message in case server is down
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).send({ error: 'Service unavailable.' });
  }
});

// POST - Signup a user
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await new User({
      name,
      email,
      password
    }).save();
    res.status(201).json({ userId: user._id, accessToken: user.accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Could not create user', errors: err.errors });
  }
});

// Login user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ userId: user._id, accessToken: user.accessToken });
    } else {
      res.status(404).json({
        notFound: true,
        message: 'Username and/or password is not correct'
      });
    }
  } catch (err) {
    res.status(404).json({
      notFound: true,
      message: 'Oops! Something goes wrong. Try again later!'
    });
  }
});

// Secure endpoint, user needs to be logged in to access this
// Wanted to add authorization check (403) on :id but didn't get it fully to work
// Decided to keep the endpoint as-is
app.get('/users/:id/secret', authenticateUser);
app.get('/users/:id/secret', async (req, res) => {
  try {
    const secretMessage = `This is a super secret message for  ${req.user.name}`;
    res.status(201).json({ secretMessage });
  } catch (err) {
    res.status(404).json({
      notFound: true,
      message: 'Oops! Something goes wrong. Try again later!'
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
