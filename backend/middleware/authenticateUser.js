import { User } from "../models/userModel";

// Middleware to authenticate the user on login. Next() makes the program continue to the next middleware
export const authenticateUser = async (req, res, next) => {
    const user = await User.findOne({ accessToken: req.header("Authorization") });

    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).json({ loggedOut: true }); // Returns an error if the user is not logged in
    }
};