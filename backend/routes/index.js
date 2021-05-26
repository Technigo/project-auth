import { Router } from 'express';

import { authenticate } from '../controllers/authController';
import * as user from '../controllers/userController';

const router = new Router();

router.post('/signup', user.register);
router.post('/login', user.login);

router.use(authenticate);

router.get('/secret', (req, res, next) => {
  try {
    res.status(200).json({
      secret: "This is the secret data!"
    });
  } catch (error) {
    next(error);
  }
});

export default router;
