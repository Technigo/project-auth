// Set up the server.
import express from "express";

// Imports the Node.js crypto library for generating secure random strings.
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./config/db";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing.
app.use(cors());

// Connect to express app.
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Use the routes for handling API requests.
// ROUTES - These routes USE controller functions.
app.use(userRoutes);

connectDB();

// Using the express app to listen to the port and can open and connect to it.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
