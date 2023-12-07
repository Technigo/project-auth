import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    if (!accessToken) {
      return res.status(401).json({ success: false, response: "Unauthorized" });
    }
    console.log("accessToken", accessToken);
    // Decode the token
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "default_secret"
    );

    // Find the user based on the decoded token information (e.g., user ID)
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, response: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, response: error.message });
  }
};

// export const authenticateUser = async (req, res, next) => {
//   const accessToken = req.header("Authorization");
//   try {
//     const user = await UserModel.findOne({ accessToken: accessToken });
//     if (user) {
//       req.user = user;
//       next();
//     } else {
//       res.status(401).json({ success: false, response: "Please log in" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, response: error.message });
//   }
// };

// WHERE SHOULD THIS BE EXPORTED TO?
