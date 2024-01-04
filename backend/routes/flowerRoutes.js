import express from 'express';
import { getFlowerByType } from '../controllers/flowerController';

const router = express.Router();

router.get('/flowers/:type', getFlowerByType);


export default router;
