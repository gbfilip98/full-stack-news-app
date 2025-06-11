import { type Article } from "./Article";

export type Category =
    "Home"
    | "Business"
    | "General"
    | "Health"
    | "Science"
    | "Sports"
    | "Technology"
    | "Favorites";

export interface RegularNewsContextData {
  articles: Article[];
  totalArticles: number;
  category: Category;
  page: number;
  searchInput: string;
  isLoading?: boolean;
  error?: string | null;
}

export interface InfiniteNewsContextData {
  articles: Article[];
  pageSize: number;
  isLoading?: boolean;
  error?: string | null;
}