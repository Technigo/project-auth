import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);
export const connectDB = asyncHandler(async () => {
  try {
    mongoose.set("strictQuery", false);

    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongo DB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);

    process.exit(1);
  }
});
