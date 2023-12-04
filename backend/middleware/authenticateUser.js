import { UserModel } from "../models/UserModel";

export const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  if (req.header.authorization && req.header.authorization.startsWith("Bearer"))
    try {
      const user = await UserModel.findOne({ accessToken: accessToken });
      if (user) {
        req.user = user;
        // continue to next middleware or route
        next();
      } else {
        res.status(400).json({ sucess: false, response: "Please log in" });
      }
    } catch (e) {
      res.status(500).json({ sucess: false, response: e.message });
    }
};
