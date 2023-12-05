/*import express from "express";
import listEndpoints from "express-list-endpoints";
import cryto from "crypto";

const router = express.Router();

// Start defining your routes here
router.get("/", (req, res) => {
  try {
    const endpoints = listEndpoints(router);
    res.json(endpoints);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/secrets", (req, res) => {
  res.json({ secret: "This is super secret message." });
});*/
