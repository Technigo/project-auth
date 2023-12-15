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

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(adRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
    res.json(listEndpoints(app));
});

connectDB();
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
