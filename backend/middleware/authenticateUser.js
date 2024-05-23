import jwt from "jsonwebtoken"
import User from "../model/User.js"

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Token:', token);
    console.log('Dekrypterad token:', decoded);
    const user = await User.findOne({ _id: decoded.userId })
    if (!user) {
      throw new Error()
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" })
  }
}

export default authenticateUser
