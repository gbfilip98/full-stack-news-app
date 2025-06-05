// import express from 'express';
// import { signup, login, verifyEmail, getUser } from '../controllers/authController.js';
// import { authenticate } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.post('/signup', signup);
// router.post('/login', login);
// router.get('/verify', verifyEmail);
// router.get('/me', authenticate, getUser);

// export default router;

import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/register', authController.register);
router.patch('/verify', authController.verify);
router.post('/login', authController.login);

export default router;