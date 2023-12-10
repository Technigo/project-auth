import express from 'express';
import { getSecret } from '../controllers/secretController';
import authenticateUser from '../middleware/authenticationMiddleware';

const router = express.Router();

router.get('/secrets', authenticateUser, getSecret);

export default router;
