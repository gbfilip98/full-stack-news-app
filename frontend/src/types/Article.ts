export interface IArticle {
  _id?: string;
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
  category?: string;
}

export interface INewsApiResponse {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export interface ISingleArticle {
  article: IArticle;
}
