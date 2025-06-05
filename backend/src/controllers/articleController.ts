import axios from 'axios';
import { Response } from 'express';
// import { fetchNewsArticles } from '../services/newsService.js';
import { NewsApiResponse } from '../types/NewsAPI';
import { AuthRequest } from '../types/Auth';
import dotenv from 'dotenv';
dotenv.config();

export const getArticles = async (req: AuthRequest, res: Response) => {
  const { page, pageSize, q, category } = req.query;

  console.log("req.query", req.query)
  console.log("asdf", page, pageSize, q, category)
  try {
    const response = await axios.get<NewsApiResponse>(
    process.env.NEWS_API_URL!,
      {
        params: {
          q: q || "a",
          category: category,
          pageSize: pageSize,
          page: page,
          apiKey: process.env.NEWS_API_KEY,
        },
        headers: {
          Accept: 'application/json',
        },
      }
    );

    console.log("asasvonevpe", response.data.totalResults)

    res.json(response.data);
  } catch (error) {
    console.error('News fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch news articles' + error });
  }
};