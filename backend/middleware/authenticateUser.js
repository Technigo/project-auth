import { UserModel } from "../models/UserModel";
//access tokens in code/middleware
//middleware function that looks up the user based on the access token

export const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorisation");
  try {
    const user = await UserModel.findOne({ accessToken: accessToken });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ success: false, response: "Please log in" });
    }
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  }
};

//authenticate user function from codealong
// const authenticateUser = async (req, res, next) => {
//   const user = await User.findOne({ accessToken: req.header("Authorisation") });
//   //this Authorisation is linked to the frontend?
//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     res.status(401).json({ loggedOut: true });
//   }
// };
