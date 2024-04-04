
// Import necessary libraries and modules
import express from "express"; // Import the Express.js framework
import cors from "cors"; // Import the CORS middleware
import dotenv from "dotenv"; // Import dotenv for environment variables
import expressListEndpoints from "express-list-endpoints";
dotenv.config(); // Load environment variables from the .env file
import userRoutes from "./routes/userRoutes"; // Import custom user routes
// import contactRoutes from "./routes/contactRoutes"
// import mediaRoutes from "./routes/mediaRoutes"
import { connectDB } from "./config/db"; // Import database connection function (not used here)

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Use the routes for handling API requests
// ROUTES - These routes USE controller functions ;)
// Use the task-controlled routes for task-related requests
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











// // server.js
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import authUserMiddleware from './middleware/authMiddleware';
// // import userRoutes from './models/userModel';
// import authUserRoutes from './routes/authUserRoutes';
// import secretRoute from './routes/secretRoutes'; // Add this line
// import listEndpoints from 'express-list-endpoints';
// import dotenv from 'dotenv';
// dotenv.config();

// console.log('JWT_SECRET:', process.env.JWT_SECRET);


// const mongoUrl = process.env.MONGO_URI || "mongodb://localhost/project-mongo";
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = Promise;

// const port = process.env.PORT || 8080;
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request at ${req.url}`);
//   next();
// });

// app.use('/auth', authUserMiddleware);
// app.use('/user', authUserRoutes);
// app.use('/secret', secretRoute);

// app.get("/", (req, res) => {
//   res.json(listEndpoints(app));
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });




// server.js
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import authUserMiddleware from './middleware/authMiddleware';
// import userRoutes from './models/userModel';
// import authUserRoutes from './routes/authUserRoutes';
// import listEndpoints from 'express-list-endpoints';
// import dotenv from 'dotenv';
// dotenv.config();

// const mongoUrl = process.env.MONGO_URI || "mongodb://localhost:27017/project-mongo";
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = Promise;

// const port = process.env.PORT || 8080;
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request at ${req.url}`);
//   next();
// });

// app.use('/auth', authUserMiddleware);

// app.use('/user', userRoutes);
// app.use('/auth', authUserRoutes);

// app.get("/", (req, res) => {
//   res.json(listEndpoints(app));
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });







