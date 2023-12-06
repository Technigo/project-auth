import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router as userRoutes } from "./routes/userRoutes";
//import { connectDB } from "./config/db";
import dotenv from "dotenv";
dotenv.config();

// MODEL, CONTROLLER, ROUTE, SERVER.JS

//Moved to db.js
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1/project-auth";
mongoose
  //.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .connect(mongoUrl)
  .then(() => console.log("Database connection established!")) // Checks if the connection is successful
  .catch((err) => console.log(err)); // If not, it will print the error message

mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

//const express = require("express");
//const userRoutes = express.Router();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
//BEHÖVS DENNA?
//app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Imported routes in the app
app.use(userRoutes); // Mounting routes in the Express app

// Connection to the database through Mongoose
//connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
