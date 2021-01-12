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
- !!! semi checked- Your API should validate the user input when creating a new user, and return error messages which could be shown by the frontend.
- Check to see if server is up and running, if not then throw error.
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
  email: {
    type: String,
    unique: true,
    //How validate that there is an @ in the email here
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

// Middleware function: looks up the user, based on the access token
// stored in the header (test via Postman).
// Call the next() function which allows the protected endpoint continue
// execution.
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true, message: "invalid loggin" });
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
    const salt = bcrypt.genSaltSync();
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    await user.save();
    res.status(201).json({
      id: user._id,
      accessToken: user.accessToken,
      message: "user was created",
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user", errors: err.errors });
  }
});

// Use authenticateUser function to protect our secret endpoint.
// Try in postman - loggedOut: true

//Authenticate endpoint
app.get("/users/:id", authenticateUser);
app.get("/users/:id", (req, res) => {
  res.status(501).send("This could be the users login view");
});

// Log-in endpoint. Find user.
app.post("/sessions", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(201).json({
        userId: user._id,
        accessToken: user.accessToken,
        message: "User logged in",
      });
    } else {
      throw "User not found";
    }
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
