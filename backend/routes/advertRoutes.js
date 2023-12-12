import express from "express";
import { authenticateUser } from "../middlewares/authenticateUser";
import {
    getOwnAdvertsController,
    addNewAdvertController
} from "../controllers/advertControllers";

const router = express.Router();

// An authenticated endpoint which returns only the adverts belonging to the user if the Authorization header with the user's token was correct
router.get("/get", authenticateUser, getOwnAdvertsController);

// An authenticated endpoint for the user to post an advert
router.post("/add", authenticateUser, addNewAdvertController); 

export default router;