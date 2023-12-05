import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"; // Import dotenv for environment variables
import userRouter from './routes/UserRoutes.js'; // Import the user routes

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/projectauth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Existing route
app.get("/", (req, res) => {
  res.send("Hello user!");
});

// User related routes
app.use('/api/users', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
