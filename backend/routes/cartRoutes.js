import express from "express";
import { addUserCartController } from "../controllers/cartController";
import { authenticateUser } from "../middleware/authenticateUser";

const router = express.Router();

// Endpoint
router.post("/cart/:user_id", authenticateUser, addUserCartController);

export default router;
