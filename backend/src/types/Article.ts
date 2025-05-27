// src/types/Article.ts
export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

//NIGDJE SE NE KORISTI
// Optional type for full response
export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}