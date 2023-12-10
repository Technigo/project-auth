// Import User model
import User from "../models/User";

// Define authenticateUser middleware
const authenticateUser = async (req, res, next) => {
    // Get access token from Authorization header
    const accessToken = req.headers.authorization;
    // Find user with matching access token
    const user = await User.findOne({ accessToken });

    // If user is found, call next middleware
    if (user) {
        next();
    } else {
        // If user is not found, respond with 401 Unauthorized status and error message
        res.status(401).json({ message: "You are not authenticated" });
    }
};

// Export authenticateUser middleware
export default authenticateUser;