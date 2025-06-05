import express from 'express';
// import axios from 'axios';
// import { NewsApiResponse } from '../types/Article';
import * as articleController from '../controllers/articleController';
import { requireAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/articles', requireAuth, articleController.getArticles);
// router.get('/sources', articleController.getSources);

export default router;