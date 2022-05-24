import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
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

///////// Monday
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
  accesToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {
  
  const { username, password } = req.body;
  try {
    // const secretMessage = "lalalala";
    // const secretAlgorithm = (message) => {
    //   transformedMessage =  message.forEach(element => {
    //     // taking one letter and replacing it by the nex one in the aplpahbet
    //   });
    //   /// mbmbmbmbmbmb
    //   return transformedMessage
    // }
    const salt = bcrypt.genSaltSync();

    if(password.length < 8) {
      res.status(400).json({
        response: "Password must be at least 8 characters long",
        success: false
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt)
      }).save();
      res.status(201).json({
        response: {
          username: newUser.username,
          accesToken: newUser.accesToken,
          userId: newUser._id
        },
        success: true
      });
    }
  } catch(error) {
    res.status(400).json({
      response: error,
      success: false
    });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username});

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        username: user.username,
        accesToken: user.accesToken,
        userId: user._id
      });
    } else {
      res.status(400).json({
        response: "username and password don't match",
        success: false
      });
    }
  } catch(error) {
    res.status(400).json({
      response: error,
      success: false
    });
  }
});

const authenticateUser = async (req, res, next) => {
  const accesToken  = req.header("Authorization");
  try {
    const user = await User.findOne({accesToken: accesToken});
    if(user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    });
  }
}


app.get("/thoughts", authenticateUser);
app.get("/thoughts", (req, res,) => {res.send("here are your thoughts")});

//////CORS v2
app.use(cors({
  origin: "https://my-origin.com"
}));

/// CORS V3
const allowedDomains = [
  "http://lalala.io",
  "http://something.com",
  "https://lorem.com",
];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedDomains.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("domain not allowed"), false);
    }
  }
}));
//////////
// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
