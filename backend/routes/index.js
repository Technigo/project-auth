import { Router } from 'express';

import * as user from '../controllers/userController';

const router = new Router();

router.post('/signup', user.register);

export default router;
