import express from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/userController";


const router = express.Router();
const listEndpoints = require("express-list-endpoints");

app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

// Handle user registration
router.post("/register", registerUserController);

// Handle user login
router.post("/login", loginUserController);

// Export the router for use in the main application
export default router;
