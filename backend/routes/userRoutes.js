import express from "express";
import listEndpoints from "express-list-endpoints";
import { authenticateUser } from "../middleware/authenticateUser.js";
import {
  addRegisterController,
  loginUserController,
} from "../controllers/userController.js";

// Creating an instance of the Express router
const router = express.Router();

// List of all endpoints
router.get("/", async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "OK",
      body: {
        content: "Anna & Susannes project-auth API",
        endpoints: listEndpoints(router),
      },
    });
  } catch (error) {
    // 500 is internal server error, the server cannot process the request for an unknown reason.
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Route to register and authenticate a user
router.post("/register", addRegisterController);

// Route to login and authenticate a user
router.post("/login", loginUserController);

// Add the authenticateUser middleware to the route to protect it
router.get("/secrets", authenticateUser);
router.get("/secrets", async (req, res) => {
  res.json({ secret: "This is top secret" });
});

// Export the router for use in the main application
export { router };
