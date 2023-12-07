import express from "express";
import bcrypt from "bcrypt-nodejs";
import { User } from "../models/user";

const router = express.Router();

// Middleware for user authentication
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true, message: "Unauthorized access" });
  }
};

// Register Route
router.post("/users", async (req, res) => {
  try {
    // Basic input validation (can be enhanced)
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res
      .status(201)
      .json({ success: true, id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user", error: err.message });
  }
});

// Login Route
router.post("/sessions", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userId: user._id,
        accessToken: user.accessToken,
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(400).json({ message: "Login failed", error: err.message });
  }
});

// Authenticated Route
router.get("/secrets", authenticateUser, (req, res) => {
  res.json({ secret: "This is a super-secret message." });
});

router.get("/", (req, res) => {
  res.send(listEndpoints(router));
});

export { router as routes };
export default router;
