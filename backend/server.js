import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth"
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
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

// This middleware function checks if a user is authenticated based on the access token
// provided in the request headers. If the access token matches a user in the database, 
// the user is stored in the req.user property, and the next middleware or 
// route handler is called. Otherwise, it sends a 401 Unauthorized response

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({accessToken: req.header('Authorization')});
  if(user){
    req.user = user;
    next();
  } else {
    res.status(401).json({loggedOut: true});
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
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.post('/register', async (req, res) => {
  try{
    const {name, email, password} = req.body;
    // DO NOT STORE PLAINTEXT PASSWORDS
    const user = new User ({name, email, password: bcrypt.hashSync(password)});
    user.save();
    res.status(201).json({id: user._id, accessToken: user.accessToken});
  }catch(err){
    res.status(400).json({messege: 'Could not create user', errors: err.errors});
  }
})

app.get('/secrets', authenticateUser);
app.get('/secrets', (req, res) =>{
  res.json({secret: 'This is a super secret message.'});
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({userId: user._id, accessToken: user.accessToken});
  } else {
    res.json({notFound: true});
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
