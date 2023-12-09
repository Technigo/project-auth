import { NextFunction, Request, Response } from "express";

const User = require("../models/userModel");

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ accessToken: req.headers.authorization });
    if (user) {
      req.body.name = user;
      next();
    } else {
      res.status(401).json({ loggedOut: true });
    }
  } catch (err) {
    res.status(500).json({ success: false, response: err.message });
  }
};

// const dbEntry = { name: "bob", password: "Sabbc32983def" };
// bcrypt.compareSync(request.password, dbEntry.password);
