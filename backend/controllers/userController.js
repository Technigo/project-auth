import { UserModel } from "../models/UserModel";
//asyncHandler: We use asyncHandler to simplify error handling in asynchronous code. It helps us avoid writing repetitive try-catch blocks by automatically catching errors and passing them to our error handling middleware. This makes our code cleaner and more readable, reducing the risk of unhandled exceptions that could crash the server.
import asyncHandler from "express-async-handler";
// bcrypt: We use bcrypt to securely hash and store passwords in our database. Storing plain-text passwords is a security risk, as it exposes user credentials in case of a data breach. bcrypt helps us hash passwords in a way that is computationally expensive and time-consuming for potential attackers, making it difficult to crack passwords even if the database is compromised. It enhances the overall security of user authentication in our application.
import bcrypt from "bcrypt";
// jwt (JSON Web Tokens): We use jwt for authentication and authorization. It allows us to create and verify tokens that contain user identity information, such as user IDs or roles. These tokens are often sent with requests to secure routes and verify that a user has the necessary permissions to access certain resources. JWTs are stateless and efficient, making them a popular choice for secure communication between the client and server.
import jwt from "jsonwebtoken";

// CONTROLLER FUNCTION EXAMPLE

// @desc    Register new user - describe what the controller function will do [i.e Register new user ]
// @route   POST /register - HTTP Code first followed by routee [i.e POST /register]
// @access  Public - Access type - if it is public or private route

// export const CHANGENAMEHERE = asyncHandler(async (req, res) => {

// });

// -----------------------
// -----------------------
// -----------------------
// -----------------------

// Function to generate a JWT token for user authentication
const generateToken = (user) => {
  // Generate a JWT token containing the user's unique ID, with an optional secret key and a 24-hour expiration time
  return jwt.sign({ accessToken: user.accessToken }, process.env.JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });
};

// Actual Functions here

// -----------------------
// -----------------------

// @desc    Register new user
// @route   POST api/register
// @access  Public

export const registerUserController = asyncHandler(async (req, res) => {
  // Extract email, username and password from the request body
  const { username, password, email } = req.body;
  // In this try section of the try catch we will first do some conditional logic and then generate the newUser with a crypted password within the DB.
  try {
    // 1st Condition
    // Check wether all fields of registration logic are NOT [!email] inputted from the request.body object
    if (!username || !email || !password) {
      // if so, set http status to a 400code
      res.status(400);
      // and throw new error with some info
      throw new Error("Please add all fields");
    }
    // 2nd Condition
    // Check if the current user trying to register is using an usernam or email that matches with the same username or email in the database, so they would have to choose something diferent
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(400);
      throw new Error(
        `User with ${
          existingUser.username === username ? "username" : "email"
        } already exists`
      );
    }

    // Generate a salt and hash the user's password
    //In this line below, we're using the bcrypt library to create a random value called "salt." The salt is added to the password before hashing it. It adds an extra layer of security by making it more difficult for attackers to use precomputed tables (rainbow tables) to crack passwords. The 10 in genSaltSync(10) represents the cost factor, which determines how computationally intensive the hashing process will be.
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);
    // In this line below, we're using the generated salt to hash the user's password. Hashing transforms the password into a secure and irreversible string of characters. The bcrypt library handles the entire process for us, ensuring that the password is securely hashed. The resulting hashedPassword is what we store in the database to keep the user's password safe.
    // Create a new user instance with the hashed password
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    // Mongoose Method: newUser.save()
    // Description: Save the new user instance to the database
    await newUser.save();

    // Respond with a success message, user details, and the JWT token
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        email: newUser.email,
        id: newUser._id,
        // OLD
        // accessToken: generateToken(newUser.accessToken), // Generate a JWT token for the new user using the user Id :)
        // NEW
        accessToken: newUser.accessToken, // Generate a JWT token for the new user using the acessToken generated from the model
      },
    });
  } catch (e) {
    // Handle any errors that occur during the registration process
    res.status(500).json({ success: false, response: e.message });
  }
});

// -----------------------
// -----------------------

// @desc    Login Existing User
// @route   POST api/login
// @access  Public

export const loginUserController = asyncHandler(async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  try {
    // Find a user with the provided username in the database
    const user = await UserModel.findOne({ username });
    if (!user) {
      // If no user is found with the provided username, respond with a 401 Unauthorized and a user not found message
      return res
        .status(401)
        .json({ success: false, response: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If the provided password doesn't match the stored password, respond with a 401 Unauthorized and an incorrect password message
      return res
        .status(401)
        .json({ success: false, response: "Incorrect password" });
    }

    // Respond with a success message, user details, and the JWT token
    res.status(200).json({
      success: true,
      response: {
        username: user.username,
        id: user._id,
        // OLD
        //accessToken: generateToken(user.accessToken), // Generate a JWT token for the new user using the user Id :)
        // NEW
        accessToken: user.accessToken, //  token for the user using the acessToken generated from the model
      },
    });
  } catch (e) {
    // Handle any errors that occur during the login process
    res.status(500).json({ success: false, response: e.message });
  }
});