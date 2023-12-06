import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-authentication";
        const conn = mongoose.connect(mongoUrl);

        // If the connection is successful, log a message indicating that the MongoDB is connected
        // console.log(`Mongo DB Connected: ${conn.connection.host}`);
    } catch (err) {
        // If an error occurs during the connection attempt, log the error message
        console.log(err);

        // Exit the Node.js process with an exit code of 1 to indicate an error
        process.exit(1);
    };
}
