import express from 'express';
import { getAllFlowers, getFlowerById } from '../controllers/flowerController'; 

const router = express.Router();

// Route to get all flowers
router.get('/flowers', getAllFlowers);

// Route to get a single flower by ID
router.get('/flowers/:id', getFlowerById);

export default router;
