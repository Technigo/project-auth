import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Routes from "Routes.js";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Imported routes in the app
app.use(Routes); // Mounting routes in the Express app

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
//Behövs denna?
// app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
