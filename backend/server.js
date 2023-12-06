import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import advertiserRoutes from "./routes/advertiserRoutes";
import advertRoutes from "./routes/advertRoutes";
import { connectDB } from "./config/db";

mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.use(advertiserRoutes);
app.use(advertRoutes);

// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
