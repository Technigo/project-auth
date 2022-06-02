import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRoutes.js";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.json({
    "Routes": [
      {
        "path": "/",
        "method": "GET"
      },
      {
        "path": "/users",
        "methods": "GET"
      },
      {
        "path": "/signup",
        "method": "POST"
      },
      {
        "path": "/signin",
        "method": "POST"
      },
      {
        "path": "/session",
        "method": "GET"
      }
    ]
  });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
