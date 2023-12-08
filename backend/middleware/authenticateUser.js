// Import the UserModel from the User model file
import { UserModel } from "../models/UserModel";

export const authenticateUser = async (req, res, next) => {
  
  const accessToken = req.header("Authorization");
  try {
    
    const user = await UserModel.findOne({ accessToken: accessToken });
    if (user) {
      
      req.user = user; 
      next(); 
    } else {
      // If no user is found, send a 401 Unauthorized response
      res.status(401).json({ success: false, response: "Please log in" });
    }
  } catch (e) {
    // Handle any errors that occur during the database query or user authentication
    res.status(500).json({ success: false, response: e.message });
  }
};

