import express from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/userController";
import { UserModel } from "../models/UserModel";
const router = express.Router();
const listEndpoints = require("express-list-endpoints");

//List endpoints to display in the deploy on Render
router.get("/", (req, res) => {
  res.send(listEndpoints(router));
});

//Endpoint to list all users for debugging
router.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

//login route
router.post("/login", loginUserController);

//register route
router.post("/register", registerUserController);

export default router;
