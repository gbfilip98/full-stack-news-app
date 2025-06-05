import { type Article } from './Article';

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

//NIGDJE SE NE KORISTI
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}