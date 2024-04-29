// // Import the UserModel from the User model file
// import { UserModel } from "../models/userModel";
// // Define a function called authenticateUser that takes a request (req), response (res), and a next function as parameters
// export const authenticateUser = async (req, res, next) => {
//   // Retrieve the access token from the request header
//   const accessToken = req.header("Authorization");
//   try {
//     // Find a user in the database using the retrieved access token
//     // Mongoose Method: UserModel.findOne({ accessToken: accessToken })
//     // Description: This line of code serves the purpose of authenticating a user based on the provided access token. It checks if a user with the specified accessToken exists in the database using the UserModel. If a user is found, their user document is stored in the user variable. This allows the middleware to add the user object to the request, making it available for subsequent middleware or routes. If no user is found, it prepares to send a 401 Unauthorized response to indicate that the user needs to log in. This code is an essential part of user authentication in the Node.js application and helps control access to protected routes or endpoints.
//     const user = await UserModel.findOne({ accessToken: accessToken });
//     if (user) {
//       // If a user is found, add the user object to the request object
//       req.user = user; // Add user to the request object
//       next(); // Continue to the next middleware or route
//     } else {
//       // If no user is found, send a 401 Unauthorized response
//       res.status(401).json({ success: false, response: "Please log in" });
//     }
//   } catch (e) {
//     // Handle any errors that occur during the database query or user authentication
//     res.status(500).json({ success: false, response: e.message });
//   }
// };
import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  // Retrieve the access token from the request header and remove the "Bearer " prefix if present
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, response: "No token provided, please log in" });
  }

  const token = authHeader.split(' ')[1]; // Get the token from the header

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user using the ID decoded from the token
    const user = await UserModel.findById(decoded.id).select("-password"); // Exclude password from user data
    if (!user) {
      return res.status(404).json({ success: false, response: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error(`JWT Error: ${error.message}`);
    res.status(401).json({ success: false, response: "Invalid token, please log in again" });
  }
};
