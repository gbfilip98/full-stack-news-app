import externalApi from './externalApi.js';
import { NewsApiResponse } from '../types/NewsAPI.js';

// import axiosRetry from 'axios-retry';
// axiosRetry(externalApi, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
// npm install axios-retry


export const fetchNewsArticles = async (page: number = 1): Promise<NewsApiResponse> => {
  const response = await externalApi.get<NewsApiResponse>(process.env.NEWS_API_URL || "", {
    params: {
      q: 'a',
      pageSize: 10,
      page,
      apiKey: process.env.NEWS_API_KEY || "",
    },
  });

  return response.data;
};