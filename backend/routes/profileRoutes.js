import express from "express";
import {
  addUserProfileController,
  getUserProfileController,
} from "../controllers/profileController";
import { authenticateUser } from "../middleware/authenticateUser";

const router = express.Router();

router.post("/profile/:userId", authenticateUser, addUserProfileController);
router.get("/profile/:userId", authenticateUser, getUserProfileController);

export default router;
