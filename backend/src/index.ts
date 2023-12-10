import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import { router as userRouter } from "./routes/userRoutes";
import { router as gifRouter } from "./routes/gifRoutes";
import listEndpoints from "express-list-endpoints";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/project-auth";

mongoose.connect(mongoUrl).then(() => console.log("connected"));

const port = process.env.PORT || 8080;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/gif", gifRouter);
app.use("/", (req, res) => {
  res.json(listEndpoints(app));
});

app.all("*", (req, res, next) => {
  res.status(500).json({ status: "fail", message: "Something went very wrong 💥 " });
  next();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
