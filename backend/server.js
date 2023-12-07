import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectToMongoDB } from "./config/db";
import { userRouter } from "./routes/userRouter";

// Defines the port the app will run on
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use("/", userRouter);

// Connects to the database
connectToMongoDB();

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
