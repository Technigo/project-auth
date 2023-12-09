import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = asyncHandler(async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.Promise = Promise;

    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Mongo DB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);

    process.exit(1);
  }
});
