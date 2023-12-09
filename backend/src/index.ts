import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
const mongoose = require("./config/db");

const bcrypt = require("bcrypt-nodejs");
dotenv.config();

mongoose.connectDB();

const User = require("./models/userModel");
const listEndpoints = require("express-list-endpoints");

const port = process.env.PORT || 8080;
const app = express();

const userRouter = require("./routes/userRoutes");
const gifRouter = require("./routes/gifRoutes");

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
