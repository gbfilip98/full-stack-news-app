import axios from 'axios';
import type { Article } from '../types/Article';

export const getArticles = async (page = 1): Promise<Article[]> => {
  const res = await axios.get(`/api/articles?page=${page}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.data;
};

//PROMINIT