import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Connection to the database through Mongoose
export const connectDB = async () => {
  try {
    const mongoUrl =
      process.env.MONGO_URL || "mongodb://127.0.0.1/project-auth"; // Get the connection string from the environment variable, or use the default value
    const connection = await mongoose.connect(mongoUrl); // Connect to the database
    console.log(`${connection.connection.name} is connected to MongoDB`); // If successful, print the name of the database
  } catch (error) {
    console.log("Could not connect to MongoDB", error); // If unsuccessful, print the error message
    process.exit(1); // Exit the process with failure
  }
};
