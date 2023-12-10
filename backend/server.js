// Import necessary libraries and modules
import express from "express"; // Import the Express.js framework
import cors from "cors"; 
import mongoose from "mongoose"; 
import dotenv from "dotenv"; 

import taskRoutesUpgraded from "./routes/taskRoutesUpgraded"; 
import userRoutesUpgraded from "./routes/userRoutesUpgraded"; 
import { connectDB } from "./config/db"; 
import listEndpoints from 'express-list-endpoints';


dotenv.config();

// const handlePreflight = require('./corsMiddleware'); // Remove this line

const port = process.env.PORT || 3002; 
const app = express(); 

// Add middlewares 
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// const handlePreflight = require('./corsMiddleware'); // Remove this line

app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

const handlePreflight = require('./middleware/corsMiddleware');

// Use the routes for handling API requests

// ROUTES - These routes DO NOT USE controller functions ;)
// app.use(taskRoutes); // Use the task routes for task-related requests
// app.use(userRoutes); // Use the user routes for user-related requests

// ROUTES - These routes USE controller functions ;)
app.use(taskRoutesUpgraded); // Use the task-controlled routes for task-related requests
app.use(userRoutesUpgraded); // Use the user-controlled routes for user-related requests
app.use(handlePreflight);
connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});
