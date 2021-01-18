import express from 'express'; 
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// User Model 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minLength: 5,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true
  }
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  // Hash the password – this happens after the validation.
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);


const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ accessToken: req.header('Authorization')});
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ loggedOut: true, message: 'Please try logging in again' });
    };
  } catch (err) {
    res.status(403).json({ message: 'Access token is missing or wrong', errors: err });
  };
};

// Defines the port the app will run on. 
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello this is an authentication API 🗝 ');
});

// REGISTRATION ENDPOINT 
app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await new User({ name, password }).save();
    res.status(201).json({ userId: user._id, accessToken: user.accessToken });
  } catch (error) {
    res.status(400).json({ message: 'Could not create user', error });
  }
});

// SECURE ENDPOINT
app.get('/users/:id', authenticateUser);
app.get('/users/:id', (req, res) => {
  const secretMessage = 'This is a super secret message';
  res.status(201).json({ secretMessage });
});

// LOGIN ENDPOINT 
app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ userId: user._id, accessToken: user.accessToken });
    } else {
      res.status(404).json({ notFound: true, message: "Check if username and/or password is correct" });
    };
  } catch (err) {
    res.status(404).json({ notFound: true, message: "Check if username and/or password is correct"});
  };
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
