import express from "express";
import listEndpoints from "express-list-endpoints";
// import dotenv from "dotenv";
// dotenv.config();
import {
  addRegisterController,
  loginUserController,
} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

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
    // Error handling
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

router.get("/secrets", authenticateUser);
router.get("/secrets", async (req, res) => {
  res.json({ secret: "This is top secret" });
});

// Export the router for use in the main application
//module.exports = router;
//export default router;
export { router };
