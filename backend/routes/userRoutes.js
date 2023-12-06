import express from "express";
//import listEndpoints from "express-list-endpoints";
// import dotenv from "dotenv";
// dotenv.config();
import {
  addRegisterController,
  loginUserController,
} from "../controllers/userController.js";

// Creating an instance of the Express router
const router = express.Router();

// Route to register and authenticate a user
router.post("/register", addRegisterController);

// Route to login and authenticate a user
router.post("/login", loginUserController);

// Export the router for use in the main application
//module.exports = router;
//export default router;
export { router };
