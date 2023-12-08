import express from "express";
import listEndpoints from "express-list-endpoints";
import {
  registerUserController,
  loginUserController,
  secret,
} from "../controllers/userController";
// import { authenticateUser } from "../middleware/authenticateUser";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/profile", authenticateUser, secret);

// New endpoint to display all registered endpoints
router.get("/", (req, res) => {
  const endpoints = listEndpoints(router);
  res.json(endpoints);
});

export default router;
