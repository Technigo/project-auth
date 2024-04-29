import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import listEndpoints from 'express-list-endpoints';
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import adRoutes from "./routes/adRoutes";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

app.use(adRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
    res.json(listEndpoints(app));
});

connectDB();
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
