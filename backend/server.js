import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authUserMiddleware from '../backend/middleware/authUser';
import userRoutes from './models/userModel';
import secretRoute from './routes/secretRoutes';
import listEndpoints from 'express-list-endpoints';
import 'dotenv/config';
require('dotenv').config();


const mongoUrl = process.env.MONGO_URI || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Add logging middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

// Use the authUserMiddleware for authentication routes
app.use('/auth', authUserMiddleware);
// Use the userRoutes for registration and sign-in routes
app.use('/user', userRoutes);
// Use the secretRoute for the authenticated secret content route
app.use('/secret', secretRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
