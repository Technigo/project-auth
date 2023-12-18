import express from "express";
import {
  addUserProfileController,
  getUserProfileController,
  updateUserProfileController,
} from "../controllers/profileController";
import { authenticateUser } from "../middleware/authenticateUser";
import { upload } from "../middleware/multer";

const router = express.Router();

router.post(
  "/profile/:userId",
  authenticateUser,
  upload.single("image"),
  addUserProfileController
);
router.get("/profile/:userId", authenticateUser, getUserProfileController);
router.put(
  "/profile/:userId",
  authenticateUser,
  upload.single("image"),
  updateUserProfileController
);

export default router;
