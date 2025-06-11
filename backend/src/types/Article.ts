// src/types/Article.ts

export interface ArticleSource {
  id: string | null;
  name: string;
}

export interface Article {
  source: ArticleSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}