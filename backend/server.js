import express, { urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

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
