
import express from "express"; 
import cors from "cors"; 
import mongoose from "mongoose"; 
// import dotenv from "dotenv"; 
// dotenv.config(); 
import userRoutes from "./routes/userRoutes"; 
// import { connectDB } from "./config/db";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;


// const port = process.env.PORT; 
const app = express(); 

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data


app.use(userRoutes); 


// connectDB();



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
