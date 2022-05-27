import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth-laura-joanna";
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



const UserSchema = new mongoose.Schema({
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

const User = mongoose.model("User", UserSchema);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        response: "Password is too short, must be at least 8 characters",
        success: false
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt)
      }).save(); 
      res.status(201).json({
        response: {
          username:newUser.username,
          accessToken: newUser.accessToken,
          userId: newUser._id
        },
        success: true
      })
    }
  } catch (error) {
    res.status(400).json({
      response: 'Error registering',
      success: false
    })
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username});

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        userId: user._id,
        username: user.username,
        accessToken: user.accessToken
      });
    } else {
      res.status(400).json({
        response: "Username and password do not match",
        sucess: false
      })
    }

  } catch (error) {
    res.status(400).json ({
      response: 'Error logging in',
      sucess: false,
    });
  }
});


const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');
  try {
    const user = await User.findOne({accessToken: accessToken});
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false
      });
    }
  } catch (error) {
    res.status(400).json({
      response: "Please log in",
      success: false
    });
  }
}

app.get('/loggedin', authenticateUser);
app.get('/loggedin', (req, res) => {res.json({
    response: 'Secret page for logged in users',
    success: true
  });
});



// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
