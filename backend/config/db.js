import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    // Exit the Node.js process with an exit code of 1 to indicate an error
    process.exit(1);
  }
};
