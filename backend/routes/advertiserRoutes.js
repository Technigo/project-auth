import express from "express";
import { 
    registerUserController,
    showAllUsersController,
    signinUserController
} from "../controllers/advertiserControllers";

const router = express.Router();

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

export default router;