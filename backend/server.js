import express from "express";
import cors from "cors";
//import mongoose from "mongoose";
import dotenv from "dotenv"; // Import dotenv for environment variables
import listEndpoints from 'express-list-endpoints';
dotenv.config(); // Load environment variables from the .env file
import { connectDB } from "./config/db"; // Import database connection function 
import userRoutes from "./routes/userRoutes";
import asyncHandler from "express-async-handler";
import advertRoutes from "./routes/advertRoutes";

// Defines the port the app will run on. 
const port = process.env.PORT;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data


// Defining routes here
app.use(advertRoutes); //Access the advertRoutes
app.use(userRoutes); //Access the userRoutes
// Endpoint to show documentation of all endpoints
app.get(
  "/", 
  asyncHandler(async (req, res) => {
      const endpoints = listEndpoints(app);
      res.json(endpoints);
  })
);

// Connection to the database through Mongoose (commented out in this version)
connectDB();

//const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
//mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.Promise = Promise;

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
