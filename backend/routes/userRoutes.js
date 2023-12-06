import express from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/userController";
const router = express.Router();
const listEndpoints = require("express-list-endpoints");

router.get("/", (req, res) => {
  res.send(listEndpoints(router));
});

//login route
router.post("/login", loginUserController);

//register route
router.post("/register", registerUserController);

export default router;
