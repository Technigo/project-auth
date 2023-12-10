// Import necessary libraries and modules
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';
import dotenv from 'dotenv';

// Import route files
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import secretRoutes from './routes/secretRoutes';

// Load environment variables from a .env file
dotenv.config();

// Allow for flexible queries in MongoDB
mongoose.set('strictQuery', false);

// Connect to MongoDB using the provided URI or a default local URI
const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost/project-mongo';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Set the port for the Express application, defaulting to 8080
const port = process.env.PORT || 8080;

// Create an instance of the Express application
const app = express();

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Use the defined routes for different parts of the application
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', secretRoutes);

// Define a root endpoint to display available endpoints using express-list-endpoints
app.get('/', (req, res) => {
  try {
    // Get and send a list of available endpoints
    const endpoints = listEndpoints(app);
    res.json({ endpoints });
  } catch (error) {
    // Handle any errors that occur while listing endpoints
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the Express server on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
