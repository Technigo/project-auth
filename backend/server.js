import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(404).json({ response: "Please, log in", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing

//v1 - Allow all domains
app.use(cors());
app.use(express.json());

// v2 - allow only one specific domain
//app.use(cors({origin: "https://my-project-frontend.com"}))

//v3 - Allow multiple domains:
// const allowedDomains = [...];
// app.use(
//   cors({
//     origin:
//       (origin,
//       (callback) => {
//         if (allowedDomains.includes(origin)) {
//           return callback(null, true);
//         } else {
//           return callback(new Error("this domain is not allowed"), false);
//         }
//       }),
//   })
// );

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log("Creating user", req.body);
  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw "Password must be at least 5 characters long";
    }

    const newUser = await new User({
      email,
      password: bcrypt.hashSync(password, salt),
    });

    await newUser.save();
    res.status(201).json({
      response: {
        id: newUser._id,
        accessToken: newUser.accessToken,
        email: newUser.email,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  console.log("signin", req.body);

  try {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          Id: user._id,
          email: email,
          accessToken: user.accessToken,
        },
        success: true,
      });
    } else {
      res.status(404).json({
        response: "User email or password doesn't match",
        success: false,
      });
    }
  } catch (error) {
    res.status(404).json({ response: error, success: false });
  }
});

app.get("/game", authenticateUser);
app.get("/game", async (req, res) => {
  res.json({ message: "The game is under construction" });
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});

// authentication - 401 (Unauthorized) But should be unauthenticated
// authorization - 403(forbidden) But should be unauthorized.
