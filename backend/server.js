import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';
import cookieParser from "cookie-parser";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

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
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({accessToken: req.cookies.accessToken});
  if (user) {
    req.user = user;
    res.json({loginData: user.name})
    next();
  } else {
    res.status(401).json({loggedOut: true});
  }
}

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
// app.use(cors({
//   credentials: true,
//   origin: 'https://symphonious-otter-f4f9a9.netlify.app/signin'
// }));

const whitelistedOrigins = ['https://symphonious-otter-f4f9a9.netlify.app/', 'https://auth-login-form-project.herokuapp.com/'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelistedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      let msg =
      "The CORS policy for this site does not " +
      "allow access from the specified Origin.";
      callback(new Error(msg), false);
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("[POST]: /signup, [POST]: /signin, [GET]: /secrets ");
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await new User({name, email, password: bcrypt.hashSync(password)});
    user.save();
    res.cookie('accessToken', user.accessToken);
    res.status(201).json({id: user._id, accessToken: user.accessToken});

  } catch(err) {
    res.status(400).json({message: 'Could not create user', errors: err.message})
  }
})

app.get('/secrets', authenticateUser);

app.post('/signin', async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.cookie('accessToken', user.accessToken);
    res.status(201).json({id: user._id, accessToken: user.accessToken});
  } else {
    res.json({notFound: true});
  } 
});

app.get("/logout", (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).json({response: 'You are now logged out'})
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
