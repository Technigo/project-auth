import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";
import dotenv from "dotenv";
dotenv.config();

// mongoose connection
const mongoUrl = process.env.MONGO_URL 
|| "mongodb://localhost/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// schema mongoose
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const SecretSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Message is required"],
  },
});


// User model
const User = mongoose.model("User", UserSchema, "users");
const Secret = mongoose.model('Secret', SecretSchema, 'secrets');

// Defines the port the app will run on. Defaults to 8080
const port = process.env.PORT || 8080;
const app = express();

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();

  } else if (!user) {
    res.status(401).json({ loggedOut: true });
  } else if (user) {
    res.status(401).json({ accessDenied: true });

  } else {
    res.status(401).json({ loggedOut: true });
  }
}

// Routes
app.get("/", (req, res) => {
  res.json([
    {
      // home route
      "path": "/",
      "methods": ["GET"],
      "middlewares": ["anonymous"]
    },
    {
      // signup route
      "path": "/signup",
      "methods": ["POST"],
      "middlewares": ["anonymous"]
    },
    {
      // login route
      "path": "/login",
      "methods": ["POST"],
      "middlewares": ["anonymous"]
    },
    {
      // secrets route
      "path": "/secrets",
      "methods": ["GET", "POST"],
      "middlewares": ["authenticateUser"]
    },
    {
      // logout route
      "path": "/logout",
      "methods": ["POST"],
      "middlewares": ["authenticateUser"]
    }

    
  ]);
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    await user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
    }
   catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not create user", errors: err.errors });
  }
  
});

app.post("/secrets", async (req, res) => {
  const { message } = req.body;
  const secret = new Secret({ message });

  try {
    const savedSecret = await secret.save();
    res.status(201).json(savedSecret);
  } catch (err) {
    res.status(400).json({ message: 'Could not save secret to the Database', error: err.errors });
  }
});


app.get("/secrets", authenticateUser, (req, res) => {
  Secret.find().then((secrets) => {
    res.json(secrets);
  });
}
);

// login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Something went wrong", error: err });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // User is authenticated
      res.json({ userId: user._id, accessToken: user.accessToken });
    });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
});

// logout route
app.post("/logout", authenticateUser, async (req, res) => {
  try {
    req.user.accessToken = crypto.randomBytes(128).toString("hex");
    await req.user.save();
    res.status(200).json({ loggedOut: true });
  }
  catch (err) {
    res.status(400).json({ message: "Could not log out", error: err });
  }
}
);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

