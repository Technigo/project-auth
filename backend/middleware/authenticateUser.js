import { User } from "../models/userModel";

// Middleware to authenticate the user on login. Next() makes the program continue to the next middleware
export const authenticateUser = async (req, res, next) => {
    try {
        // Check if the Auth header is present
        const authHeader = req.header("Auth");
        if (!authHeader) {
            return res.status(403).send("No access token provided!");
        }

        // Find the user by token
        const user = await User.findOne({ accessToken: token });

        // If the users exists, the user will be added to the request object
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(403).send("Invalid or expired access token!");
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).send("Server error");
    }
};
