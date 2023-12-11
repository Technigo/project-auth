import express from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import {
  getAdvertController,
  updateAdvertController,
  deleteAllAdvertController,
  deleteSpecificAdvertController,
  addAdvertController,
} from "../controllers/advertController";

// Create an instance of the Express router
const router = express.Router();

// Define a route for handling GET requests to retrieve all tasks
router.get("/get", authenticateUser, getAdvertController);

// Define a route for handling PUT requests to update a specific task by ID
router.put("/update/:id", updateAdvertController);

// Define a route for handling DELETE requests to delete all tasks
router.delete("/deleteAll", deleteAllAdvertController);

// Define a route for handling DELETE requests to delete a specific task by ID
router.delete("/delete/:id", deleteSpecificAdvertController);

// Define a route for handling POST requests to add a new task
router.post("/add", authenticateUser, addAdvertController);

// Export the router for use in the main application
export default router;

