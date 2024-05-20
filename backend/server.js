import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8787;
const app = express();

// Add middlewares to enable cors and json body parsing
//allow all for now, restrict later
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/", router);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
