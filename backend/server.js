import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/auth";
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

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    // npm install crypto
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
});

const User = mongoose.model("User", UserSchema);
/// Registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  /// const code = [1, 2, 3, 4, 5]
  /// const makeCodeSecret = (codeArray, salt) => {
  /// const transformedCode = codeArray.map(singleNumber => singleNumber + salt)
  /// return transformed array
 /// }
  try {
    const salt = bcrypt.genSaltSync();
    // Do not store plaintext passwords
    const newUser = await new User({
      username: username,
      password: bcrypt.hashSync(password, salt)})
    .save();
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        id: newUser._id,
        accessToken: newUser.accessToken
      }
    })
  } catch (e) {
    // Bad request
    res.status(400).json({
      success: false,
      response: e,
      message: 'Could not create user', 
      errors: e.errors
    });
  }
});
/// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({username: username})
    // const user = await User.findOne({username})
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
      res.status(400).json({
        success: false,
        response: "Credentials do not match"
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      response: e
    });
  }
});
////
// Thoughts

// const ThoughtSchema = new mongoose.Schema({
//   message: {
//     type: String
//   },
//   createdAt: {
//     type: Date,
//     default: () => new Date()
//   },
//   hearts: {
//     type: Number,
//     default: 0
//   },
//   user: {
//     type: String,
//     require: true
//   }
// });

// const Thought = mongoose.model("Thought", ThoughtSchema);

// Authenticate the user
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({accessToken: accessToken});
    if (user) {
      next();
    } else {
      res.status(401).json({
        success: false,
        response: "Please log in",
        loggedOut: true
      })
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      response: e
    });
  }
}

app.get("/secrets",authenticateUser);
app.get("/secrets", async (req, res) => {
  res.status(200).json({secret: 'This is a super secret message'})
});

app.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});
    if (user && bcrypt.compareSync(req.body.password, user.password)){
      res.json({ userId:user._id, accessToken: user.accessToken })
    } else {
      res.json({notFound: true})
    }
});

// app.post("/thoughts",authenticateUser);
// app.post("/thoughts", async (req, res) => {
//   const { message } = req.body;
//   const accessToken = req.header("Authorization");
//   const user = await User.findOne({accessToken: accessToken});
//   const thoughts = await new Thought({message: message, user: user._id}).save();
//   res.status(200).json({success: true, response: thoughts})
// });
///////////
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



// Test in postman

// Post: http://localhost:8080/register
// Post: http://localhost:8080/login
// {
//     "username": "Sammie",
//     "password": "passwordx"
// }

// Authenticated endpoint
// Return a 401 or 403 with error message if someone tries to access it without an authentication

// API should validate the user input when creating a new user, and return error messages which could be shown by the frontend 

// localStorage.removeItem() for log out (to not lose everything when logging out)


