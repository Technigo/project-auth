import express from "express";
import asyncHandler from "express-async-handler";
import listEndpoints from "express-list-endpoints";
import { 
    registerUserController,
    showAllUsersController,
    signinUserController
} from "../controllers/advertiserControllers";

const router = express.Router();

// Endpoint to show documentation of all endpoints
router.get(
    "/", 
    asyncHandler(async (req, res) => {
        const endpoints = listEndpoints(router);
        res.json(endpoints);
    })
);

// Endpoint to show all users
router.get(
    "/users", 
    showAllUsersController
);

// Registration endpoint, to create a new user
router.post(
    "/register",
    registerUserController
);

// Sign-in endpoint, to authenticate a returning user
router.post(
    "/signin", 
    signinUserController
);

// An authenticated endpoint which only returns content if the Authorization header with the user's token was correct


export default router;