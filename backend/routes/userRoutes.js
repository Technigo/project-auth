import express from "express";

import {
    showAllUsersController,
    registerUserController,
    loginUserController,
} from "../controllers/userController";

// Create an instance of the Express router
const router = express.Router();

// SHOW USERS: show all users
router.get(
    "/users",
    showAllUsersController
);

// REGISTER ROUTE: Handle user registration
router.post(
    "/register",
    registerUserController
);

// LOGIN ROUTE: Handle user login
router.post(
    "/login",
    loginUserController
);

// Export the router for use in the main application
export default router;