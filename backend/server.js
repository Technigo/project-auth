// Import necessary libraries and modules
import express from "express"; // Import the Express.js framework
import cors from "cors"; // Import the CORS middleware
import mongoose from "mongoose"; // Import Mongoose, an ODM for MongoDB
import dotenv from "dotenv"; // Import dotenv for environment variables
dotenv.config(); // Load environment variables from the .env file
// DIEGO -- IMPORT After Creating!
import userRoutes from "./routes/userRoutes"; // Import custom user routes
import userRoutesUpgraded from "./routes/userRoutesUpgraded"; // Import custom user routes
import { connectDB } from "./config/db"; // Import database connection function (not used here)

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Use the routes for handling API requests

// ROUTES - These routes DO NOT USE controller functions ;)
// app.use(taskRoutes); // Use the task routes for task-related requests
// app.use(userRoutes); // Use the user routes for user-related requests

// ROUTES - These routes USE controller functions ;)
app.use(userRoutesUpgraded); // Use the user-controlled routes for user-related requests

// Connection to the database through Mongoose (commented out in this version)
connectDB();

// Connection to the database through Mongoose (for local development)
// const mongoUrl = process.env.MONGO_URL; // Get the MongoDB connection URL from environment variables
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }); // Connect to the MongoDB database
// mongoose.Promise = Promise; // Set Mongoose to use ES6 Promises

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});
