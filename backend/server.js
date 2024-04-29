import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import listEndpoints from "express-list-endpoints";
import userRoutes from "./routes/userRoutes.js"
import quoteRoutes from "./routes/quoteRoutes.js"
import { connectDB } from "./config/db.js"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 3000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);
app.use(quoteRoutes);

// Function to connect to MongoDB
connectDB();

// List all endpoints
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 