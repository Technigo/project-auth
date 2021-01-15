import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

//To achieve:
/* 
- checked - Sign up - New user endpoint 
- checked - Log in - sessions authenticate returning user
- checked - Authenticate/Secrets endpoint (get request) which only returns content if the Authorization header with the users token is returned.
- checked - The authenticated endpoint should return a 401 or 403 (see 401 vs. 403 on SO) with an error message if you try to access it withoutan Authentication access token or with an invalid token.
- checked - Your passwords in the database should be encrypted with bcrypt.
- checked- Your API should validate the user input when creating a new user, and return error messages which could be shown by the frontend.
- check to see if server is up and running, if not then throw error.

Questions:
- Site deploy - error regarding throw.
- Authenticate user: second error message - when will this be shown? How to get to the 401 in the authenticateUser to show if the accessToken isn't authorized when doing the get request for the secret endpoint.
- Line 31 Login.js handleloginfailed - what is the error message reffering to, line 161 sessions?
- What should we show on the UserProfile page? In brief say's: A page to show the authenticated content from the API.
- Vans code userProfile.js why has he written the url as template literal for the fetch.

Problems:
1. Can sign in without password.
*/

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Validation rules on model: unique name, email, and required password.
// Otherwise 400 error is triggered.
const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  accessToken: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

// Middleware function: looks up the user, based on the access token
// stored in the header (test via Postman).
// Call the next() function which allows the protected endpoint continue
// execution.

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization");
    const user = await User.findOne({ accessToken });
    if (!user) {
      throw "User not found";
    }
    req.user = user;
    next();
  } catch (err) {
    const errorMessage = "Please try logging in again";
    console.log(errorMessage);
    res.status(401).json({ error: errorMessage });
  }
};

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors()); 
app.use(bodyParser.json());

// Checking if database is up and running
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable" });
  }
});

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Registration endpoint. Create user.
// Restrict access to this endpoint with authentication method. User will need access token.
// Never store plain text passwords!
// 1. Retrieve value from the json req body
// 2. Create an instance of the User mongoose model using that info. hashSync() to encrypt.
// 3. Save user to DB
// 4. If success: return status code with id of user which is the internal Mongoose id, and the access token
// that the user can use to access our secrets endpoint.
// 5. If failure: return error message.

// Sign up - New user endpoint
app.post("/users", async (req, res) => {
  try {
    const { name, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const user = new User({
      name,
      password: bcrypt.hashSync(password, salt),
    });
    await user.save();
    res.status(201).json({
      id: user._id,
      accessToken: user.accessToken,
      statusMessage: "User was created",
    });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ statusMessage: "Could not create user", errors: err.errors });
  }
});

// Log-in endpoint. Find user.
app.post("/sessions", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(201).json({
        id: user._id,
        accessToken: user.accessToken,
        statusMessage: "User logged in",
      });
    } else {
      throw "User not found";
    }
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

//should show more detils for the user
app.get("/secret", authenticateUser);
app.get("/secret", async (req, res) => {
  console.log(`User from authenticateUser: ${req.user}`);
  const secretMessage = `Welcome ${req.user.name}! This is for your eyes only.. `;
  res.status(200).json({ secretMessage });
});

//Authenticate endpoint (motsvarar Van:s sprofile id endpoint)
// app.get("/users/:id", authenticateUser);
// app.get("/users/:id", (req, res) => {
//   const secretMessage = `We can modify this secret message for ${req.user.name}`;
//   res.status(200).json({ secretMessage });
//   // res.status(501).send("This could be the users login view");
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// **************** Vans code ***********************
// app.get('/users/:id/profile', authenticateUser);
// app.get('/users/:id/profile', async (req, res) => {
//   const user = await User.findOne({ _id: req.params.id });
//   const publicProfileMessage = `This is a public profile message for ${user.name}`;
//   const privateProfileMessage = `This is a private profile message for ${user.name}`;

//   console.log(`Authenticated req.user._id: '${req.user._id.$oid}'`);
//   console.log(`Requested     user._id    : '${user._id}'`);
//   console.log(`Equal   : ${req.user_id == user._id}`);

//   // Decide private or public here
//   if (req.user._id.$oid === user._id.$oid) {
//     // Private
//     res.status(200).json({ profileMessage: privateProfileMessage });
//   } else {
//     // Public information or Forbidden (403) because the users don't match
//     res.status(200).json({ profileMessage: publicProfileMessage });
//   }
// });

