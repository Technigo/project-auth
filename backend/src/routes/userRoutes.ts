import express from "express";

const router = express.Router();
import {
  getAllUsers,
  createNewUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

router.get("/", getAllUsers);
router.post("/signup", createNewUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export { router };
