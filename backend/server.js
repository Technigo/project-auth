import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import adminRouter from "./routes/adminRoutes.js";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";
dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8787;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(
  cors({
    origin: ["*","https://auntauthy.netlify.app", "https://aunt-authy.onrender.com/", "https://project-auth-pqxu.onrender.com/"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/", router);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  try {
    const endpoints = listEndpoints(router);
    const updatedEndpoints = endpoints.map((endpoint) => {
      if (endpoint.path === "/" || endpoint.path === "/admin") {
        return {
          path: endpoint.path,
          methods: endpoint.methods,
          queryParameters: [],
        };
      }
      return {
        path: endpoint.path,
        methods: endpoint.methods,
      };
    });
    res.json(updatedEndpoints);
  } catch (error) {
    // If an error occurred, create a new error with a custom message
    const customError = new Error(
      "An error occurred while fetching the endpoints"
    );
    res.status(404).json({
      success: false,
      response: error,
      message: customError.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
