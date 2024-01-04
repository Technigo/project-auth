import express from "express";
import {
    addUserCartController,
    // getUserCartController,
    // deleteAllUserCartsController,
    // deleteUserCartController,
    // updateUserCartController
} from "../controllers/cartController";
import { authenticateUser } from "../middleware/authenticateUser";

const router = express.Router();

// Endpoints
router.post("/cart/:user_id", authenticateUser, addUserCartController);
// router.get("/cart/:user_id", authenticateUser, getUserCartController);
// router.delete("/cart/all/:user_id", authenticateUser, deleteAllUserCartsController);
// router.delete("/cart/:cart_id", authenticateUser, deleteUserCartController);
// router.put("/cart/:cart_id", authenticateUser,updateUserCartController);

export default router;
