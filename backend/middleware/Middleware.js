import User from "../model/user-model";
import dotenv from "dotenv";
import Blacklist from "../model/blacklist-model";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET = process.env.SECRET || "toast is the best secret";


const authenticateUser = async (req, res, next) => {
  // Get the token from the request headers
  const bearerHeader = req.headers["authorization"];
  //check if token is undefined, because if it is, we don't have any time for that - bzzzt!
  if (typeof bearerHeader !== "undefined") {
    //split the token like a lumberjack, and separate the bearer from the token
    const bearer = bearerHeader.split(" ");
    // Check if the bearer array has exactly 2 elements and the first element is 'Bearer'
    if (bearer.length === 2 && bearer[0] === "Bearer") {
      const bearerToken = bearer[1];
      try {
        //decode the token 🤫
        const decoded = jwt.verify(bearerToken, SECRET);
        // find user with the decoded id
        const user = await User.findById(decoded.id);
        //check if user exists and ready to party like a request object
        if (user) {
          req.user = user;
          req.user.accessToken = bearerToken; // Set the access token for the user
          //move to the next middleware -> authorizeUser or isLoggedIn to see if token is valid (not stored in blacklist)
          next();
        } else {
          res.status(401).json({
            loggedOut: true,
            message: "you must log in to gain access",
          });
        }
      } catch (err) {
        res.status(403).json({ loggedOut: true, message: "Invalid token" });
      }
    } else {
      res.status(403).json({
        loggedOut: true,
        message:
          "Invalid Authorization header format. It should be 'Bearer <token>'",
      });
    }
  } else {
    res.status(403).json({ loggedOut: true, message: "No token provided" });
  }
};

// authorize user
const authorizeUser = (roles) => {
  return (req, res, next) => {
    //check if user role is in the roles array and can hang out with the cool kids
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `You are not authorized to access this page. Required roles: ${roles.join(
          ", "
        )}`,
      });
    }
    next();
  };
};

//check if user is logged in and the token is not in the blacklist
const isLoggedIn = async (req, res, next) => {
  if (req.user) {
    try {
      // Query the database to check if the token exists in the blacklist
      const tokenInBlacklist = await Blacklist.findOne({ token: req.user.accessToken });

      // If the token is in the blacklist, return a 401 status
      if (tokenInBlacklist) {
        return res
          .status(401)
          .json({ message: "This token has been invalidated" });
      }

      // If the token is not in the blacklist, proceed to the next middleware function or route handler
      next();
    } catch (error) {
      // If there's an error while querying the database, return a 500 status with a detailed error message
      return res
        .status(500)
        .json({ message: "Error retrieving token blacklist", error: error.message });
    }
  } else {
    // If the user is not logged in, return a 403 status
    res.status(403).json({ message: "No user logged in" });
  }
};

//log out user
const logoutUser = async (req, res, next) => {
  try {
    if (!req.user || !req.user.accessToken) {
      return res.status(400).json({ message: "Invalid user or access token" });
    }

    // Add the token to the blacklist, so it can't be used again
    const token = req.user.accessToken;
    const blacklistEntry = new Blacklist({ token: token });
    await blacklistEntry.save();
    //remove the access token from the user, this was a one time thing baby- you got to let it go
    req.user.accessToken = null;
    await req.user.save();
    //tell the user they are logged out, because we are polite like that, and dont ghost people
    res.json({ message: "You are now logged out" });
  } catch (error) {
    // if we can let that user go, we will let them know - but if we can't, we will let the console know
    res.status(500).json({
      message: "An error occurred while logging out",
      error: error.message,
    });
  }
};

export { authenticateUser, authorizeUser, logoutUser, isLoggedIn };
