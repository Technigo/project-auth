import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  securityLevel: {
    type: Number,
    default: 1,
  },
  accessToken: {
    type: String,
    required: true,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);

const Riddle = mongoose.model("Riddle", {
  riddleId: Number,
  riddle: String,
  answer: String,
});

if (process.env.RESET_DB) {
  Riddle.deleteMany().then(
    new Riddle({
      riddleId: 1,
      riddle: "Riddle 1: What needs to be broken before you can use it?",
      answer: "egg",
    }).save(),
    new Riddle({
      riddleId: 2,
      riddle:
        "Riddle 2: What is black when it’s clean and white when it’s dirty?",
      answer: "chalkboard",
    }).save(),
    new Riddle({
      riddleId: 3,
      riddle: "Riddle 3: What begins with a T, ends with a T and has T in it?",
      answer: "teapot",
    }).save(),
    new Riddle({
      riddleId: 4,
      riddle: "Riddle 4: There are no more riddles",
      answer: "no more riddles",
    }).save()
  );
}

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({
    accessToken: req.header("Authorization"),
  });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ response: "Please log in", success: false });
  }
};

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

// authenticate on an endpoint
app.get("/riddles", authenticateUser);
app.get("/riddles", async (req, res) => {
  try {
    const riddle = await Riddle.findOne({
      riddleId: req.user.securityLevel,
    });
    console.log(riddle);
    res.send({
      response: {
        riddles: riddle.riddle,
        securityLevel: req.user.securityLevel,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      response: "Something went wrong with riddles",
      error: error,
      success: false,
    });
  }
});

app.post("/answer", authenticateUser);
app.post("/answer", async (req, res) => {
  try {
    const { answer } = req.body;
    console.log(answer);

    const riddle = await Riddle.findOne({
      riddleId: req.user.securityLevel,
    });

    if (!answer) {
      throw "You didn't provide an answer, please try again";
    }

    if (answer === riddle.answer) {
      req.user.securityLevel = riddle.riddleId + 1;
      await req.user.save();

      const newRiddle = await Riddle.findOne({
        riddleId: req.user.securityLevel,
      });
      res.status(200).json({
        response: {
          riddles: newRiddle.riddle,
          correct: true,
          securityLevel: req.user.securityLevel,
        },
        success: true,
      });
    } else {
      res.status(200).json({
        response: {
          riddles: riddle.riddle,
          correct: false,
          securityLevel: req.user.securityLevel,
        },
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: "Something went wrong with answers",
      error: error,
      success: false,
    });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      throw "Username is required";
    }

    if (password.length < 5) {
      throw "Password must be longer than 5 characters";
    }
    const salt = bcrypt.genSaltSync();

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save();

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
      },
      success: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        response: "Username already exists, please choose another username",
        error: error,
        success: false,
      });
    } else {
      res.status(400).json({
        response: "Something went wrong",
        error: error,
        success: false,
      });
    }
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      });
    } else {
      res.status(404).json({
        response: "Incorrect username or password",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: "Something went wrong",
      error: error,
      success: false,
    });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
