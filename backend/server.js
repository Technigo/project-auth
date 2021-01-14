import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/auth';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = Promise;

const userSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
    //minlength: 8 // Unnecessary since it get bcrypt and automatically longer then 8 characters. Add this check to frontend!
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

userSchema.pre('save', async function (next) {
  const user = this;
  
  if (!user.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync();
  console.log(`PRE-password before hash: ${user.password}`)
  user.password = bcrypt.hashSync(user.password, salt);
  console.log(`PRE-password after hash: ${user.password}`)
  next();
})

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
    const errorMessage = 'Please try loggin in again'
    console.log(errorMessage)
    res.status(401).json({ error: errorMessage })
  }
};

const User = mongoose.model('User', userSchema );

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const endPointList = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing

// Simple usage
// This is how we have used CORS in previous project, which is a Simple Usage (Enable All CORS Requests).
// As default the CORS allow all domain to access the server.
// Access-Control-Allow-Origin: * is shown in the network tab.  The * = all domain has access.

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  if (!res) {
    res
      .status(404)
      .send({ error: 'Oops! Something goes wrong. Try again later!' });
  }
  res.send(endPointList(app));
});

// Configuring CORS
// To limit access to a specific domain, below is an example how to write that in code.
// We only allow http://localhost:3000 as an origin.
// app.use(cors());
// app.use(bodyParser.json());

// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.get('/', cors(corsOptions), (req, res) => {
//   res.json('Hello hello');
// });

// Const's for error messages instead of text in error handling
const SERVICE_UNAVAILABLE = 'Service unavailable.';

// Error message in case database is down
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next(); // To execute next get response
  } else {
    res.status(503).send({ error: SERVICE_UNAVAILABLE });
  }
});

// Signup a user
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password
    }).save();
    console.log('user', user)
    res.status(201)
    .json({ userId: user._id, accessToken: user.accessToken })
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
        //Test and checkagain the error message
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
app.get('/users/:id/secret', authenticateUser);
app.get('/users/:id/secret', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
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
