import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  const encodedToken = req.header("Authorization");
  if (encodedToken && encodedToken.startsWith("Bearer"))
    try {
    console.log("looking for matching user")
    let token = encodedToken.split(" ") // the access token from the req looks like  : Bearer FDASFEfdasfsa13124
    // spliting around the space " " caracter will create an array with first element bearer and second element the token to search in the database ["bearer","FDASFEfdasfsa13124"]
      const decoded = jwt.verify(token[1],process.env.JWT_SECRET)
      const user = await UserModel.findById( decoded.id ).select('-password');
      if (user) {
        req.user = user;
        // continue to next middleware or route
        console.log("next step")
        next();
      } else {
        res.status(400).json({ sucess: false, response: "Please log in" });
      }
    } catch (e) {
      res.status(500).json({ sucess: false, response: e.message });
    }
};
