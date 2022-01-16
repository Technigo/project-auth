import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import listEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // order: {
  //   type: String,
  //   required: true,
  // },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);

// const OrderSchema = new mongoose.Schema({
//   message: {
//     type: String,
//     required: true,
//   },
// });

// const Order = mongoose.model("Order", OrderSchema);

const port = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ response: "Please log in", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

// Routes
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

// app.get("/order", authenticateUser);
// app.get("/order", async (req, res) => {
//   res.json({
//     response: req.user.order,
//     success: true,
//   });
// });

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw { message: "Password must be at least 5 characters long" };
    }

    const newUser = await new User({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    }).save();

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        accessToken: newUser.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: newUser.username,
          accessToken: newUser.accessToken,
          email: newUser.email,
        },
        success: true,
      });
    } else {
      res.status(404).json({
        response: "Username, email or password dosent match",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
