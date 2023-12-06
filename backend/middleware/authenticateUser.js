import { UserModel } from "../models/UserModel";

export const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await UserModel.findOne({ accessToken: accessToken });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ success: false, response: "please log in" });
    }
  } catch (error) {
    res.status(500).json({ success: false, response: error.message });
  }
};

// WHERE SHOULD THIS BE EXPORTED TO?
