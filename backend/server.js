import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"; // Import dotenv for environment variables
import userRouter from './routes/UserRoutes.js'; // Import the user routes
import listEndpoints from "express-list-endpoints";

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/projectauth";

mongoose.connect(mongoUrl, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const express = require('express');
const app = express();
const cors = require('cors');

// Add middlewares to enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

//Endpoint to list all available endpoints
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json(endpoints);
});

// User related routes
app.use('/api/users', userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
