import express from "express";
// import listEndpoints from "express-list-endpoints";
import cryto from "crypto";
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
    res.status(401).json({ loggedOut: true });
  }
};

const listEndpoints = require("express-list-endpoints");

//routes
router.get("/", (req, res) => {
  res.send(listEndpoints(router));
});

router.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    await user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user", errors: err.errors });
  }
});

router.get("/secrets", authenticateUser);
router.get("/secrets", (req, res) => {
  res.json({ secret: "This is super secret message." });
});

router.post("/sessions", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.json({ notFound: true });
  }
});
export { router as routes };
export default router;
