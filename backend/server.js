import express from "express";
import cors from "cors";
//import mongoose from "mongoose";
import { router as userRoutes } from "./routes/userRoutes";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
dotenv.config();

//Moved to db.js
// const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1/project-auth";
// mongoose
//   //.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//   .connect(mongoUrl)
//   .then(() => console.log("Database connection established!")) // Checks if the connection is successful
//   .catch((err) => console.log(err)); // If not, it will print the error message

//mongoose.Promise = Promise; // To be able to use async/await

// Defines the port the app will run on. Defaults to 8080.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors()); // To be able to connect from frontend
app.use(express.json()); // To be able to parse JSON bodies

// Mounting routes in the Express app
app.use(userRoutes);

// Connection to the database through Mongoose
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
