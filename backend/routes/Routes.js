import express from "express";
import listEndpoints from "express-list-endpoints";
import bcrypt from "bcrypt-node.js";
import { UserModel } from "../models/UserModel";

// Creating an instance of the Express router
const router = express.Router();

router.get("/", (req, res) => {
  const endpoints = listEndpoints(router);
  res.json(endpoints);
});

router.post("/register", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = new UserModel({ name, password: bcrypt.hashSync(password) });
    user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user", errors: err.errors });
  }
});

// Export the router for use in the main application
module.exports = router;
