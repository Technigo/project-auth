import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

/* ------Schemas------ */

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

const User = mongoose.model("User", UserSchema);

/* ----- Authentication -------- */

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();  // when user is confirmed call the next function on line 120 after authentication
    } else {
      res.status(401).json({ response: 'Please log in', success: false });
    }
  } catch (error) {
    res.status(500).json({ response: error, success: false });
  }
};

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

/* ------ Registration endpoint use in registration form in FE ------ */

app.post("/registration", async (req, res) => {
  const { name, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: "Your password has to have minimum 8 characters"
      });
      
    }else {
      const newUser = await new User({name: name, password: bcrypt.hashSync(password, salt)}).save();
      res.status(201).json({
        success: true,
        response: {
          name: newUser.name,
          accessToken: newUser.accessToken,
          id: newUser._id
        }
      })
    }

  }catch(error) {
    res.status(400).json({
      success: false,
      response: error
    })
  }
})


/* ------ Login endpoint use in login form in FE ------ */

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({name: req.body.name})
    if(user && bcrypt.compareSync(req.body.password, user.password)){
      res.status(201).json({
        success: true,
        response: {
          userId: user._id, 
          name: user.name,
          accessToken: user.accessToken} //secured password incrypted as a AccessToken to prevent data steal
        })
    } else {
      res.status(400).json({
        success: false,
        response: 'credentials did not match'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    })
  }
})

/* ------ Content endpoint use in component with "secret message" in FE ------ */

app.get("/content", authenticateUser);  // If authentication === true ==> fetch will use next() from line 40
                                        // if ath === false the secret content will not be display
app.get("/content", async (req, res) => { 
  const secretMessage = 'You are awesome!'
  try {
    res.status(200).json({
      success: true,
      secretMessage,
    })
  } catch (error) {
    res.status(401).json({
      errors: error,
      response: 'Failed to display the secret.',
    })
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
