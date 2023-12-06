import express from "express";
import { authorizeUser } from "../middlewares/authorizeUser";
import {
    getOwnAdvertsController,
    addNewAdvertController
} from "../controllers/advertControllers";

const router = express.Router();

// An authenticated endpoint which returns only the adverts belonging to the user if the Authorization header with the user's token was correct
router.get("/get", authorizeUser, getOwnAdvertsController);

// An authenticated endpoint for the user to post an advert
router.post("/add", authorizeUser, addNewAdvertController); 

export default router;