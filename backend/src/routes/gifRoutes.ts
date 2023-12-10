import express from "express";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

import { getGifs, createGif } from "../controllers/gifController";

router.route("/").post(authenticateUser, createGif).get(authenticateUser, getGifs);

export { router };
