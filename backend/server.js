import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import route from "./routes/routes";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(route);

connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
