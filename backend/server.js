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
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    // validate: {
    //   validator: function (value) {
    //     return (
    //       value &&
    //       value.length >= 12 &&
    //       /[A-Z]/.test(value) && // At least one uppercase letter
    //       /[a-z]/.test(value) && // At least one lowercase letter
    //       /[0-9]/.test(value) && // At least one number
    //       /[!@#$%^&*(),.?":{}|<>]/.test(value) // At least one special character
    //     );
    //   },
    //   message:
    //     "Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
    // },
    // minlength: [3, "Password cannot be empty"],
    // validate: {
    //   validator: function (value) {
    //     return value && value.trim().length > 0;
    //   },
    //   message: "Password cannot be empty",
    // },
  },
  accessToken: {
    type: String,
    default: () => bcrypt.genSaltSync(),
  },
});

const User = model("User", userSchema);

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header("Authorization"),
    });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({
        message: "Authentication missing or invalid.",
        loggedOut: true,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// // create middleware- if everything is ok, then tell express to continue execution
// const authenticateUser = async (req, res, next) => {
//   const user = await User.findOne({ accessToken: req.header("Authorization") });
//   // if user is found based on accestoken they sent in, if found- attach the user-object to the request. Modifying the request inside the middleware
//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     //if not found, return an unauthorized statuscode with loggedOut-body to true
//     res.status(401).json({
//       message: ""Authentication missing och invalid."
//       loggedOut: true });
//   }
// };

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

// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       res
//         .status(400)
//         .json({ message: "Name, email, and password are required" });
//       return;
//     }

//     const user = await new User({
//       name,
//       email,
//       password: bcrypt.hashSync(password, 10),
//     }).save();
//     res.status(201).json({ id: user._id, accessToken: user.accessToken });
//   } catch (err) {
//     if (err.code === 11000) {
//       res.status(400).json({ message: "Email or name already exists" });
//     } else {
//       res
//         .status(400)
//         .json({ message: "Could not create user", errors: err.errors });
//     }
//   }
// });

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if password is empty
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Check if password meets minimum length req
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password has to be at least 8 characters long",
      });
    }
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
app.get("/my-pages", authenticateUser, (req, res) => {
  res.json({ message: "This is your personal page" });
});
// app.get("/my-pages", authenticateUser);
// app.get("/my-pages", (req, res) => {
//   res.json({ message: "This is a super secret message" });
// });

// Allow the user to log in, not only register

app.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        userId: user._id,
        name: user.name,
        accessToken: user.accessToken,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// app.post("/sign-in", async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (user && bcrypt.compareSync(req.body.password, user.password)) {
//     res.json({
//       userId: user._id,
//       name: user.name,
//       accessToken: user.accessToken,
//     });
//   } else {
//     res.json({ notFound: true });
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
