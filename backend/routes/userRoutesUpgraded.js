import express from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/userController";

// Create an instance of the Express router
const router = express.Router();

// REGISTER ROUTE: Handle user registration
router.post("/register", registerUserController);

// LOGIN ROUTE: Handle user login
router.post("/login", loginUserController);

// Export the router for use in the main application
export default router;