import express from 'express';
// import axios from 'axios';
import { fetchNewsArticles } from '../services/newsService.js';
import { authenticate } from '../middlewares/authMiddleware.js';
// import { NewsApiResponse } from '../types/Article';

const router = express.Router();

router.get('/articles', authenticate, async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;

  try {
    const news = await fetchNewsArticles(page);
    res.json(news.articles);
    // const response = await axios.get<NewsApiResponse>(
    //   `https://newsapi.org/v2/everything?q=a&pageSize=10&page=${page}&apiKey=${process.env.NEWS_API_KEY}`
    // );
    // res.json(response.data.articles);
  } catch (error) {
    console.error('News fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch news articles' });
  }
});

export default router;