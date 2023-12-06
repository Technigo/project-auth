import express from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/userController";

const router = express.Router();

//login route
router.post("/login", loginUserController);

//register route
router.post("/register", registerUserController);

export default router;
