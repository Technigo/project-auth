import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// created a login endpoint here
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login with username: ${username} and password: ${password}`);
  // here we are creating a token ... like you get a ticket to a festival, and the wristband is the token
  res.json({ token: "1234" });
});

// here we are checking the token, if it is correct we get the message, if not we get a 401 error
app.get("/private", async (req, res) => {
  if (req.headers.authorization === "Bearer 1234") {
    res.json({ message: "This is a secret message" });
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
