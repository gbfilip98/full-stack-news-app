import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import type { AuthRequest } from '../types/express/index.d.ts';
import User from '../models/User.js';

const router = express.Router();

router.post('/', authenticate, async (req: AuthRequest, res) => {
  const { articleId } = req.body;
  const user = req.user;

  if (!user) {
    res.status(403).json({ message: 'Unauthorized' });
  } else {
    try {
      const foundUser = await User.findById(user.id);
      if (!foundUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        if (!foundUser.bookmarks.includes(articleId)) {
          foundUser.bookmarks.push(articleId);
        } else {
          foundUser.bookmarks = foundUser.bookmarks.filter(id => id !== articleId);
        }
        await foundUser.save();
    
        res.status(200).json({ bookmarks: foundUser.bookmarks });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to bookmark an article', error: err });
    }
  }
});

router.get('/', authenticate, async (req: AuthRequest, res) => {
  const user = req.user;

  if (!user) {
    res.status(403).json({ message: 'Unauthorized' });
  } else {
    try {
      const foundUser = await User.findById(user.id);
      res.json({ bookmarks: foundUser?.bookmarks || [] });
    } catch (err) {
      res.status(500).json({ message: 'Failed to get bookmarks', error: err });
    }
  }
});

export default router;