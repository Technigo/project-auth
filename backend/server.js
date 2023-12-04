import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./config/db";
// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);

connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
