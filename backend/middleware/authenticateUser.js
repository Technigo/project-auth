import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

// Middleware function to check if the user is authenticated
export const authenticateUser = async (req, res, next) => {
  // next is a function that will be called if the user is authenticated
  const accessToken = req.header("Authorization"); // Get the access token from the request header
  try {
    // If there is no access token, return an error message
    if (!accessToken) {
      return res.status(401).json({ success: false, response: "Unauthorized" }); // 401 is unauthorized
    }
    console.log("accessToken", accessToken);
    // Decode the token using the JWT_SECRET environment variable (or default value)
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "default_secret" // Use a fallback value if not set
    );

    // Find the user based on the decoded token information (e.g., user ID)
    const user = await UserModel.findById(decoded.id);

    // If the user is not found, return an error message to the client
    if (!user) {
      return res
        .status(401) // 401 is unauthorized
        .json({ success: false, response: "User not found" }); // 401 is unauthorized - the user is not found
    }

    req.user = user;
    next(); // Call the next function to continue with the request
  } catch (error) {
    // If something goes wrong, return an error message
    res.status(401).json({ success: false, response: error.message }); // 401 is unauthorized
  }
};
