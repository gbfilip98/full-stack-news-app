import express from 'express';
import * as userController from '../controllers/userController';
import { requireAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/data', requireAuth, userController.getInfo);
router.patch('/bookmark/add', requireAuth, userController.addBookmark);
router.patch('/bookmark/remove', requireAuth, userController.removeBookmark);
// router.patch

export default router;