import express, { response } from "express";
import User from "../model/user-model";

const router = express.Router();

// add middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  const user = await User.findOne({ accessToken });
  if (user) {
    req.user = user;
    next();
  } else {
    res
      .status(401)
      .json({ loggedOut: true, message: "you must log in to gain access" });
  }
};

// add middleware to authorize user
const authorizeUser = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this page" });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeUser };
