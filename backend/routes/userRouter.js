import express from "express";
import asyncHandler from "express-async-handler";
import { authenticateUser } from "../middleware/authenticateUser";
import {
    registerUserController,
    loginUserController,
    getDashboardController,
    getUsersController // Imports all the different controllers from the userController.js file
} from "../controllers/userController.js";
import listEndpoints from "express-list-endpoints";

// Creates a routerinstance using express
export const userRouter = express();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/dashboard", authenticateUser, getDashboardController); // The authenticateUser middleware is used to check if the user is logged in
userRouter.get("/users", getUsersController);

// Displays endpoints
userRouter.get("/", asyncHandler(async (req, res) => {
    try {
        const endpoints = listEndpoints(userRouter);
        res.json(endpoints);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}));