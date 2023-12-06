import express from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import {
  getTasksController,
  updateTaskController,
  deleteAllTasksController,
  deleteSpecificTaskController,
  addTaskController,
} from "../controllers/taskController";

// Create an instance of the Express router
const router = express.Router();

// Define a route for handling GET requests to retrieve all tasks
router.get("/get", authenticateUser, getTasksController);

// Define a route for handling PUT requests to update a specific task by ID
router.put("/update/:id", updateTaskController);

// Define a route for handling DELETE requests to delete all tasks
router.delete("/deleteAll", deleteAllTasksController);

// Define a route for handling DELETE requests to delete a specific task by ID
router.delete("/delete/:id", deleteSpecificTaskController);

// Define a route for handling POST requests to add a new task
router.post("/add", authenticateUser, addTaskController);

// Export the router for use in the main application
export default router;

//In this code, we have defined a set of routes for a Node.js Express application that performs CRUD (Create, Read, Update, Delete) operations on tasks. The routes handle requests to retrieve all tasks, update a specific task, delete all tasks, delete a specific task by ID, and add a new task. These operations are performed using the TaskModel from the Task model file. The code responds with JSON data for each operation and handles any errors that may occur during the database operations. Overall, this code sets up the API endpoints for managing tasks in the application.