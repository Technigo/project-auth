// Import necessary modules
import express from "express";
import authenticateUser from "../middlewares/authenticateUser";

// Create router for secret routes
const secretRoutes = express.Router();

// Define GET route for /secret path
// authenticateUser middleware is used to check if user is authenticated
// If user is authenticated, respond with a secret message
secretRoutes.get("/secret", authenticateUser, (_, res) => {
    res.json({ message: "Found me 😎" });
});

// Export secretRoutes router
export default secretRoutes;