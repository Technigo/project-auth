import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToMongoDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
        const connection = await mongoose.connect(mongoUrl);
        console.log(`${connection.connection.name} is connected to MongoDB :)`);
    } catch (error) {
        console.log("Could not connect to MongoDB", error);
        process.exit(1);
    }
}