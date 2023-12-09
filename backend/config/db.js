import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async()=>{
    try{
        const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
        mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.Promise = Promise;
    }
}




// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
