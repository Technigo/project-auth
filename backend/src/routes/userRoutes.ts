const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.post("/signup", userController.createNewUser);
router.post("/login", userController.loginUser);
router.put("/:id", userController.updateUser);

module.exports = router;
