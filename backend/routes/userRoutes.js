import express from "express";
//const listEndPoints = require("express-list-endpoints")
import { UserModel } from "../models/User";
import bcrypt from "bcrypt-nodejs";
import listEndpoints from "express-list-endpoints";

const router = express.Router();

// TEST IDAH FRÅN VAN ca 20 min in i första klippet.
const authenticateUser = async (req, res, next) => {
  //Retrieve the access token from the request header.
  const accessToken = req.header("Authorization");
  try {
    const user = await UserModel.findOne({ accessToken: accessToken });
    //If user found. Next-function makes API go further
    if (user) {
      req.user = user; //add user to the request object
      next(); //Continue to the next middleware or route
      //If user not found
    } else {
      res.status(401).json({ success: false, response: "Please log in" });
    }
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  }
};

// -------- Routes starts here -------- //

// Endpoint: GET "/"
// Provides API documentation by listing all available endpoints using express-list-endpoints
router.get("/", (req, res) => {
  const documentation = {
    endpoints: listEndpoints(router),
  };
  res.json(documentation);
});

// Endpoint: POST "/signup"
// Handles user signup. Password is hashed using bcrypt for security.
router.post("/signup", async (req, res) => {
  try {
    // Successful login
    const { name, userName, password } = req.body; //retrieving user information

    //Checking that user has filled in all fields
    if (!name || !userName || !password) {
      res.status(400).json ({ success: false, message: "Please fill in all fields"})
      return //End the function here to prevent further execution
    }

    //Checking that user with same username/name doesn't already exist
    const existingUser = await UserModel.findOne({
        $or: [{ name }, { userName }],
      });

      if (existingUser) {
        res.status(400).json({success: false, message: `User with this ${
            existingUser.userName === userName ? "username" : "name"
          } already exists`})
        return //End the function here to prevent further execution
      }

    const user = new UserModel({
      name,
      userName,
      password: bcrypt.hashSync(password),
    });

     //Saving the user to the database
    await user.save(); 
    res
      .status(201)
      .json({ success: true, id: user._id, accessToken: user.accessToken });
  } catch (err) {
    // Login failed
    res
      .status(400)
      .json({
        success: false,
        message: "Could not create user",
        errors: err,
      });
  }
});

// Endpoint: POST "/login"
// Handles user login by checking credentials agains the database.
// Returns user details and access token on successful login; otherwise, returns a notFound status.
router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ userName: req.body.userName });

    if (user) {
      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      //Checking if password is correct
      if (passwordMatch) {
        res.json({ userId: user._id, accessToken: user.accessToken });
      } else {
        res.status(401).json({ success: false, error: "Invalid password" });
      }
      //Error if user is not found: 
    } else {
      res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, repsonse: error.message, error: "Internal server error" });
  }
});


// An authenticated endpoint which only returns content if the 'Authorization' header with the user's token was correct (will only happen if the next() function is called from the middleware)
router.get("/logged-in", authenticateUser, async (req, res) => {
  try {
    res.status(200).json({ success: true, response: "On secret site" });
  } catch (error) {
    console.error("Error in /logged-in endpoint:", error);
    res.status(401).json({ success: true, response: error });
  }
});

export default router;
