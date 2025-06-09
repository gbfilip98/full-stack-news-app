import type { Article } from "@/types/Article";

export const sortArticles = (articles: Article[]): Article[] => {
  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};
