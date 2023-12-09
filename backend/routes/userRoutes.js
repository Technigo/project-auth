import express from "express";
import {
  registerUserController,
  loginUserController,
  usersController,
  authController,
} from "../controllers/userController";
import { authenticateUser } from "../middleware/authenticateUser";

// Create an instance of the Express router.
const router = express.Router();
const listEndpoints = require("express-list-endpoints");

// ----- ROUTES STARTS HERE --------

// Endpoint "/" to return documentation of API using Express List Endpoints.
router.get("/", (req, res) => {
  // Lists all endpoints registered with the router.
  const endpoints = listEndpoints(router);
  res.json({ endpoints });
});

// REGISTER ROUTE ENDPOINT - create a new user.
router.post("/register", registerUserController);

// SIGN-IN ROUTE ENDPOINT - authenticate a returning user.
router.post("/login", loginUserController);

// LIST USERS ROUTE ENDPOINT - retrieve the list of registered users.
router.get("/users", usersController);

// AUTHENTICATED ENDPOINT - only returns content if the Authorization header with the user's token was correct.
router.get("/logged-in", authenticateUser, authController);

export default router;
