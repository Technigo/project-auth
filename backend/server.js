
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expressListEndpoints from "express-list-endpoints";

import userRoutes from "./routes/userRoutes";
import { connectDB } from "./config/db";

dotenv.config();
const port = process.env.PORT;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data



app.use(userRoutes); // Use the user-controlled routes for user-related requests

//KANSKE SKA ANVÄNDA DOM HÄR
// app.use(contactRoutes); //for the contactform
// app.use(mediaRoutes); // for the images/film


// Connection to the database through Mongoose
connectDB();
// Create a dedicated endpoint to view endpoints in the browser
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
  console.log("List of Endpoints:");
  console.log(endpoints);
});

// app.use((err, req, res, next) => {
//   res.status(500).send(err);
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});















