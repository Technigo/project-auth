import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import adminRouter from "./routes/adminRoutes.js";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";
dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/aunty";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8787;
const app = express();

const allowedOrigins = [
  "https://auntauthy.netlify.app",
  "https://aunt-authy.onrender.com"

];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use("/", router);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  try {
    const routerEndpoints = listEndpoints(router);
    const adminRouterEndpoints = listEndpoints(adminRouter);
    const allEndpoints = [...routerEndpoints, ...adminRouterEndpoints];

    const descriptions = {
      "/admin/users":
        "This route retrieves all users from the database. It requires admin authorization.",
      "/admin":
        "This route renders the admin page. It requires admin authorization.",
      "/exists":
        "This route checks if a user with the provided email already exists in the database. It expects a JSON body with an 'email' field.",
      "/user":
        "This route creates a new user with the provided name, email, and password. The password is hashed before being stored in the database. Upon successful creation, it returns the new user's ID and a JWT access token.",
      "/session":
        "This route logs in a user with the provided email and password. If the email and password match a user in the database, it returns the user's ID, a new JWT access token, and the user's role.",
      "/verify":
        "This route verifies if a user is authenticated by checking their JWT access token. and if their token is not stored in our blacklist. If the token is valid, it returns a message saying the user is logged in.",
      "/role": "This route returns the role of the authenticated user.",
      "/logout":
        "This route logs out the authenticated user. It invalidates the user's JWT access token.",
      "/users/:id":
        "This route updates the user with the provided ID. If the user is found and updated successfully, it returns the updated user's data.",
      "/admin/users/:id":
        "This route updates the user with the provided ID. It requires admin authorization. If the user is found and updated successfully, it returns the updated user's data.",
      "/users": "This route retrieves all users from the database.",
      "/": "This route retrieves all endpoints available in the API.",
    };

    const updatedEndpoints = allEndpoints.map((endpoint) => {
      return {
        path: endpoint.path,
        methods: endpoint.methods,
        description: descriptions[endpoint.path] || "No description provided",
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
