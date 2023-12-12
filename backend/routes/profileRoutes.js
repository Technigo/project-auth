import express from "express";
import {
  addUserProfileController,
  getUserProfileController,
  updateUserProfileController,
} from "../controllers/profileController";
import { authenticateUser } from "../middleware/authenticateUser";

const router = express.Router();

router.post("/profile/:userId", authenticateUser, addUserProfileController);
router.get("/profile/:userId", authenticateUser, getUserProfileController);
router.put("/profile/:userId", authenticateUser, updateUserProfileController);

export default router;
