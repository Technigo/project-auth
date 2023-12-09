import { UserModel } from "../models/userModel";

export const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await UserModel.findOne({ accessToken: accessToken });
    if (user) {
      req.user = user;
      next();
    } else {
      res
        .status(401)
        .json({ sucess: false, response: "User not found. Please try again" });
    }
  } catch (e) {
    res.status(500).json({ sucess: false, response: e.message });
  }
};
