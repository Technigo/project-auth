import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

import { fileURLToPath } from "url";
import path from "path";

// Get the directory path of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from the .env file
dotenv.config({ path: path.join(__dirname, ".env") });

// Access environment variables
//const mongodbUri = process.env.MONGODB_URI;
//const jwtSecret = process.env.JWT_SECRET;

// Use the variables in your application
//console.log(`MongoDB URI: ${mongodbUri}`);
//console.log(`Server Port: ${port}`);
//console.log(`JWT Secret: ${jwtSecret}`);

//const dotenv = require("dotenv");
//const path = require("path");
//dotenv.config({ path: __dirname + "/.env" });
//console.log(fullPath);

const app = express();
const port = process.env.PORT || 9090;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Database connection

mongoose
  .connect(process.env.MONGODB_URI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    // Start the server after successfully connecting to the database
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);
  });

/*import express from "express";
import cors from "cors";
import mongoose from "mongoose"; // Add this line
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9090;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Database connection
//console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    // Start the server after successfully connecting to the database
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

/*import express, { urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(mongoUrl);

const app = express();
const port = process.env.PORT || 9090; // Define the port

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/
