import mongoose from "mongoose";

const dotenv = require("dotenv");
dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/project-auth";

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl);
    console.log(`Mongo DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
