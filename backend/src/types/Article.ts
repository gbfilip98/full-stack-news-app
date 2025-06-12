export interface IArticleSource {
  id: string | null;
  name: string;
}

export interface IArticle {
  source: IArticleSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category: string | null;
}

export interface INewsApiResponse {
  status: string;
  totalResults: number;
  articles: IArticle[];
}
