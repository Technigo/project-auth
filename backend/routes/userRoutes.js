import express from "express";
import listEndpoints from "express-list-endpoints";
import {
  registerUserController,
  loginUserController,
  secrect,
} from "../controllers/userController";
// import { authenticateUser } from "../middleware/authenticateUser";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
// router.get("/secret", authenticateUser, secrect);

// New endpoint to display all registered endpoints
router.get("/endpoints", (req, res) => {
  const endpoints = listEndpoints(router);
  res.json(endpoints);
});

export default router;
