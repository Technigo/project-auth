import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv";
import bcrypt from "bcrypt-nodejs";
//import listEndpoints from "express-list-endpoints";
//import { User } from "../backend/models/user";
import { routes } from "../backend/routes/routes";

dotenv.config();

const mongoUrl =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/project-auth";
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message)
  );
//mongoose.Promise = Promise;

// const authenticateUser = async (req, res, next) => {
//   const user = await User.findOne({ accessToken: req.header("Authorization") });
//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     res.status(401).json({ loggedOut: true });
//   }
// };

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(routes);
// app.use(express.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//   if (mongoose.connection.readyState === 1) {
//     next();
//   } else {
//     res.status(503).json({ error: "Service unavailable" });
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
