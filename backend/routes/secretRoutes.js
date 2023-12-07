import express from "express";
import authenticateUser from "../middlewares/authenticateUser";

const secretRoutes = express.Router();

secretRoutes.get("/secret", authenticateUser, (_, res) => {
    res.json({ message: "Found me 😎" });
});

export default secretRoutes;