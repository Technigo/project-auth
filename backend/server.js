import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import listEndpoints from "express-list-endpoints";
import taskRoutes from "./routes/taskRoutes.js"
import userRoutes from "./routes/userRoutes.js"
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

app.use(taskRoutes);
app.use(userRoutes);

connectDB();

// This is now in the db.js file!
/* const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/tasks";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise; */

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

/* const authenticateUser = async ( req, res, next ) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true })
  }
} */

// List all endpoints
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

/*app.post("/users", async (req, res) => {
  try {
    const{ name, email, password } = req.body;
    const user = new User({ name, email, password: bcrypt.hashSync(password)})
    await user.save()
    res.status(201).json({ id: user._id, accessToken: user.accessToken })
  } catch (err) {
    res.status(400).json({ message: "Could not create user", errors: err.errors })
  }
})

app.get("/dogs", authenticateUser)
app.get("/dogs", async (req, res) => {
  res.json({ secret: "Dogs are the best"})
}) */

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});