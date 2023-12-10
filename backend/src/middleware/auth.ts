import { NextFunction, Request, Response } from "express";

import { User } from "../models/userModel";

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
