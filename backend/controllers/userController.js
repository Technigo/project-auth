// import { UserModel } from "../models/UserModel";
// import asyncHandler from "express-async-handler";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Function to generate a JWT token for user authentication
// const generateToken = (user) => {
//     // Generate a JWT token containing the user's unique ID, with an optional secret key and a 24-hour expiration time
//     return jwt.sign({ accessToken: user.accessToken }, process.env.JWT_SECRET, {
//       expiresIn: "24h", // Token expires in 24 hours
//     });
//   };