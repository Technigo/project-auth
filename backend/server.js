import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import expressListEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// Create user object that has access-token. Mongoose-model
// Destructure schema & model
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => bcrypt.genSaltSync(),
    /* default: ()=> crypto.randomBytes(128).toString("hex") */
  },
});

const User = model("User", userSchema);

// create middleware- if everything is ok, then tell express to continue execution
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  // if user is found based on accestoken they sent in, if found- attach the user-object to the request. Modifying the request inside the middleware
  if (user) {
    req.user = user;
    next();
  } else {
    //if not found, return an unauthorized statuscode with loggedOut-body to true
    res.status(401).json({ loggedOut: true });
  }
};

// Defines the port the app will run on. Defaults to 8030, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8030;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Encrypt the password
    const user = await new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    }).save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user", errors: err.errors });
  }
});

// protect my-pages endpoint
app.get("/my-pages", authenticateUser);
app.get("/my-pages", (req, res) => {
  res.json({ message: "This is a super secret message" });
});

// Allow the user to log in, not only register
app.post("/sign-in", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.json({ notFound: true });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
