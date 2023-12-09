import express from "express";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

const gifController = require("../controllers/gifController");

router
  .route("/")
  .post(authenticateUser, gifController.createGif)
  .get(authenticateUser, gifController.getGifs);

module.exports = router;
