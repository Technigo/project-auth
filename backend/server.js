import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import userRouter from './routes/UserRoutes.js';
import listEndpoints from "express-list-endpoints";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/projectauth";

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUrl);
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

app.use(cors({
  origin: 'https://splendorous-elf-6e001c.netlify.app'
}));
app.use(express.json());

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json(endpoints);
});

// Hypothetical login route for JWT token creation
app.post('/api/login', (req, res) => {
  // This is a simplified example. In a real application, you would need to
  // verify the user's credentials (e.g., with a database) before issuing a token.
  const user = {
    id: 1, 
    username: 'john_doe', 
    email: 'john@example.com'
  };

  // Create a token with the user object and your secret
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({
    success: true,
    message: 'Authentication successful!',
    token: token
  });
});

// User related routes
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
