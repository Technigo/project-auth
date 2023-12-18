import express from "express";
import {
    addUserCartController,
    getUserCartController
} from "../controllers/cartController";
import { authenticateUser } from "../middleware/authenticateUser";

const router = express.Router();

// Endpoints
router.post("/cart/:user_id", authenticateUser, addUserCartController);
router.get("/cart/:user_id", authenticateUser, getUserCartController);

export default router;
