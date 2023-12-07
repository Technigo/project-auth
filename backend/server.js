import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"; // Import dotenv for environment variables
import userRouter from './routes/UserRoutes.js'; // Import the user routes
import listEndpoints from "express-list-endpoints";

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/projectauth";

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUrl, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
connectToDatabase();

mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();


// Add middlewares to enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

//Endpoint to list all available endpoints
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json(endpoints);
});

// User related routes
app.use('/api/users', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
