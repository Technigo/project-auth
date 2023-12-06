import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
//import dotenv from "dotenv";
// dotenv.config();

import userRoutes from "./routes/userRoutes";

//connect to database
const mongoUrl =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/project-auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

//------- MIDDLEWARE --------//

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //don't know what this line is for?

//-----Routes------//

app.use("/", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
