import express from 'express';
import { signup, login, verifyEmail, getUser } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', verifyEmail);
router.get('/me', authenticate, getUser);

export default router;